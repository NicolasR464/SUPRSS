install-back:
	docker compose exec back sh -lc "npm ci || npm install"

install-front:
	docker compose exec front sh -lc "npm ci || npm install"

add-back:
	docker compose exec back sh -lc "npm install $(PKGS)"

add-front:
	docker compose exec front sh -lc "npm install $(PKGS)"

reinstall-back:
	docker compose stop back || true
	docker volume rm $$(docker volume ls -q | grep back-node-modules) || true
	docker compose up -d back
	docker compose exec back sh -lc "npm ci || npm install"

reinstall-front:
	docker compose stop front || true
	docker volume rm $$(docker volume ls -q | grep front-node-modules) || true
	docker compose up -d front
	docker compose exec front sh -lc "npm ci || npm install"

#####
# Use it like so (for development purpose):
# make install-back
# make install-front
# make add-back PKGS="package_names"
# make add-front PKGS="package_names"
#####