pkgdatadir = join_paths(get_option('datadir'), meson.project_name())
gnome = import('gnome')

install_subdir('.', install_dir : pkgdatadir, exclude_files: ['re.sonny.OhMySVG', 'meson.build'])

bin_conf = configuration_data()
bin_conf.set('GJS', find_program('gjs').path())
bin_conf.set('PACKAGE_VERSION', meson.project_version())
bin_conf.set('PACKAGE_NAME', meson.project_name())
bin_conf.set('prefix', get_option('prefix'))
bin_conf.set('libdir', join_paths(get_option('prefix'), get_option('libdir')))
bin_conf.set('datadir', join_paths(get_option('prefix'), get_option('datadir')))

configure_file(
  input: 're.sonny.OhMySVG',
  output: 're.sonny.OhMySVG',
  configuration: bin_conf,
  install: true,
  install_dir: get_option('bindir')
)

