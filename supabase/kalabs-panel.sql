-- Panel Kalabs: schema completo del proyecto Supabase propio (cuenta kalabsuy,
-- ref lnhpwzrbzteblexwzres). Idempotente. anon no toca ninguna tabla: sólo
-- ejecuta kalabs_track y kalabs_stats, que son security definer.

create table if not exists public.kalabs_projects (
  slug text primary key,
  nombre text not null,
  url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.kalabs_presence (
  project_slug text not null references public.kalabs_projects (slug),
  session_id text not null,
  path text not null default '/',
  user_agent text not null default '',
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (project_slug, session_id)
);
create index if not exists kalabs_presence_last_seen
  on public.kalabs_presence (last_seen);

create table if not exists public.kalabs_page_views (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null references public.kalabs_projects (slug),
  path text not null default '/',
  referrer text not null default '',
  session_id text not null default '',
  created_at timestamptz not null default now()
);

insert into public.kalabs_projects (slug, nombre, url) values
  ('kalabs', 'kalabs.dev', 'https://www.kalabs.dev'),
  ('cupo', 'cupo.uy', 'https://cupo.uy'),
  ('viagrua', 'ViaGrúa', 'https://via-grua.vercel.app'),
  ('oleocaceres', 'Oleo Cáceres', 'https://oleocaceres-web.vercel.app'),
  ('oleofin', 'OleoFin', 'https://oleocaceres.vercel.app')
on conflict (slug) do update set nombre = excluded.nombre, url = excluded.url;

alter table public.kalabs_projects enable row level security;
alter table public.kalabs_presence enable row level security;
alter table public.kalabs_page_views enable row level security;
revoke all on public.kalabs_projects, public.kalabs_presence, public.kalabs_page_views
  from anon, authenticated;

create table if not exists public.kalabs_config (
  clave text primary key,
  valor text not null
);
alter table public.kalabs_config enable row level security;
revoke all on public.kalabs_config from anon, authenticated;

-- SHA-256 del token del panel. Si se cambia, cambiar también lib/panel-acceso.ts.
insert into public.kalabs_config (clave, valor)
values ('token_sha256', 'b114646494649f67a0484fa41517052a3af1edf4372d0be5cc92c7583686252f')
on conflict (clave) do update set valor = excluded.valor;

create index if not exists kalabs_page_views_proyecto_fecha
  on public.kalabs_page_views (project_slug, created_at);

create or replace function public.kalabs_track(
  p_project text,
  p_path text,
  p_session text,
  p_ua text,
  p_referrer text,
  p_evento text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from kalabs_projects where slug = p_project) then
    return false;
  end if;
  insert into kalabs_presence (project_slug, session_id, path, user_agent, last_seen)
  values (p_project, left(p_session, 64), left(p_path, 300), left(p_ua, 300), now())
  on conflict (project_slug, session_id) do update
    set path = excluded.path,
        user_agent = excluded.user_agent,
        last_seen = excluded.last_seen;
  -- Sólo el view cuenta visita; el ping refresca presencia.
  if p_evento = 'view' then
    insert into kalabs_page_views (project_slug, path, referrer, session_id)
    values (p_project, left(p_path, 300), left(p_referrer, 300), left(p_session, 64));
  end if;
  return true;
end;
$$;

-- Devuelve null si el token no corresponde. "Hoy" es el día de Montevideo.
create or replace function public.kalabs_stats(p_token text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  hoy0 timestamptz :=
    date_trunc('day', now() at time zone 'America/Montevideo')
      at time zone 'America/Montevideo';
  hace60s timestamptz := now() - interval '60 seconds';
begin
  if p_token is null
     or encode(sha256(convert_to(p_token, 'UTF8')), 'hex')
        is distinct from (select valor from kalabs_config where clave = 'token_sha256')
  then
    return null;
  end if;

  return (
    select coalesce(jsonb_object_agg(p.slug, jsonb_build_object(
      'activos', (select count(*) from kalabs_presence
                  where project_slug = p.slug and last_seen > hace60s),
      'visitasHoy', (select count(*) from kalabs_page_views
                     where project_slug = p.slug and created_at >= hoy0),
      'visitas7d', (select count(*) from kalabs_page_views
                    where project_slug = p.slug
                      and created_at >= now() - interval '7 days'),
      'topPaths', coalesce((
        select jsonb_agg(jsonb_build_object('path', t.path, 'n', t.n) order by t.n desc)
        from (select path, count(*) as n from kalabs_page_views
              where project_slug = p.slug and created_at >= hoy0
              group by path order by n desc limit 5) t
      ), '[]'::jsonb),
      'sesiones', coalesce((
        select jsonb_agg(jsonb_build_object('path', s.path))
        from (select path from kalabs_presence
              where project_slug = p.slug and last_seen > hace60s
              order by last_seen desc limit 8) s
      ), '[]'::jsonb)
    )), '{}'::jsonb)
    from kalabs_projects p
  );
end;
$$;

revoke all on function public.kalabs_track(text, text, text, text, text, text) from public;
revoke all on function public.kalabs_stats(text) from public;
grant execute on function public.kalabs_track(text, text, text, text, text, text) to anon;
grant execute on function public.kalabs_stats(text) to anon;
