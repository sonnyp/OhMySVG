iconsdir = join_paths(get_option('datadir'), 'icons')

install_data(
  '@0@.svg'.format(meson.project_name()),
  install_dir: iconsdir / 'hicolor' / 'scalable' / 'apps'
)

install_data(
  '@0@-symbolic.svg'.format(meson.project_name()),
  install_dir: iconsdir / 'hicolor' / 'symbolic' / 'apps',
  rename: '@0@-symbolic.svg'.format(meson.project_name())
)
