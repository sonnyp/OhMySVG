.PHONY: build run-host flatpak bundle test

build:
	meson --reconfigure --prefix $(shell pwd)/install build
	meson --prefix $(shell pwd)/install build
	ninja -C build install

svgo:
	npm install
	npx rollup -c

run-host:
	make clean
	make build
	GSETTINGS_SCHEMA_DIR=./data ./install/bin/re.sonny.OhMySVG

flatpak:
	flatpak-builder --user --force-clean --install-deps-from=flathub --install flatpak re.sonny.OhMySVG.json
	flatpak run --file-forwarding re.sonny.OhMySVG @@ ./src/car-lite.svg @@

bundle:
	flatpak-builder --user  --force-clean --repo=repo --install-deps-from=flathub flatpak re.sonny.OhMySVG.json
	flatpak build-bundle repo OhMySVG.flatpak re.sonny.OhMySVG --runtime-repo=https://flathub.org/repo/flathub.flatpakrepo

test:
	./node_modules/.bin/eslint --cache .
	flatpak run org.freedesktop.appstream-glib validate data/re.sonny.OhMySVG.metainfo.xml
	desktop-file-validate --no-hints data/re.sonny.OhMySVG.desktop
	# gtk4-builder-tool validate src/*.ui
	flatpak-builder --show-manifest re.sonny.OhMySVG.json

clean:
	rm -rf build install .eslintcache

dev:
	cp data/re.sonny.OhMySVG.desktop ~/.local/share/applications/ && update-desktop-database ~/.local/share/applications
	desktop-file-edit --set-key=Exec --set-value="${PWD}/re.sonny.OhMySVG %u" ~/.local/share/applications/re.sonny.OhMySVG.desktop
	desktop-file-edit --set-key=Icon --set-value="${PWD}/data/icons/re.sonny.OhMySVG.svg" ~/.local/share/applications/re.sonny.OhMySVG.desktop
	update-desktop-database ~/.local/share/applications
