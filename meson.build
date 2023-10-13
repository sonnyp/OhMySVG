project('re.sonny.OhMySVG',
  version: '1.3',
  meson_version: '>= 0.59.0',
  license: 'GPL-3.0-only'
)

gnome = import('gnome')
i18n = import('i18n')

subdir('data')
subdir('src')
subdir('po')

gnome.post_install(
  glib_compile_schemas: true,
  gtk_update_icon_cache: true,
  update_desktop_database: true
)