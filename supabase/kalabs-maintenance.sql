-- Esquema complementario para el panel de proyectos y mantenimiento en Kalabs
-- Idempotente. Ejecutar en el SQL Editor del dashboard de Supabase (lnhpwzrbzteblexwzres).

create table if not exists public.kalabs_project_registry (
  slug text primary key,
  nombre text not null,
  url text,
  categoria text not null default 'cliente',
  estado text not null default 'produccion',
  repo_github text,
  path_local text,
  frecuencia_mantenimiento_dias int default 30,
  ultimo_mantenimiento_at timestamptz default now(),
  notas text,
  ultimo_check jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kalabs_maintenance_logs (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null references public.kalabs_project_registry (slug) on delete cascade,
  tipo text not null,
  titulo text not null,
  descripcion text,
  realizado_at timestamptz not null default now()
);

alter table public.kalabs_project_registry enable row level security;
alter table public.kalabs_maintenance_logs enable row level security;
revoke all on public.kalabs_project_registry, public.kalabs_maintenance_logs from anon, authenticated;

-- Función segura para obtener proyectos con verificación de token
create or replace function public.kalabs_get_projects(p_token text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if p_token is null
     or encode(sha256(convert_to(p_token, 'UTF8')), 'hex')
        is distinct from (select valor from kalabs_config where clave = 'token_sha256')
  then
    return null;
  end if;

  return (
    select coalesce(jsonb_agg(
      jsonb_build_object(
        'slug', p.slug,
        'nombre', p.nombre,
        'url', p.url,
        'categoria', p.categoria,
        'estado', p.estado,
        'repoGithub', p.repo_github,
        'pathLocal', p.path_local,
        'frecuenciaMantenimientoDias', p.frecuencia_mantenimiento_dias,
        'ultimoMantenimientoAt', p.ultimo_mantenimiento_at,
        'notas', p.notas,
        'ultimoCheck', p.ultimo_check
      ) order by p.created_at desc
    ), '[]'::jsonb)
    from kalabs_project_registry p
  );
end;
$$;

revoke all on function public.kalabs_get_projects(text) from public;
grant execute on function public.kalabs_get_projects(text) to anon;
