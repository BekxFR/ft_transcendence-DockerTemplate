
.PHONY : all clean fclean stop

BLACK = \033[1;30m
REDBG = \033[30;41m
RED = \033[0;31m
GREEN = \033[0;32m
ORANGE = \033[0;33m
BLUE = \033[0;34m
MAGENTA = \033[0;35m
CYAN = \033[0;36m
NC = \033[0m

DOCKER_COMPOSE_FILE = ./docker/docker-compose.yml
DATA_DIR = /home/chillion/data

all : 
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d --build
	echo "${BLUE}###${NC}Docker-Compose ${GREEN}up${NC} command is done. Refer last line for status${BLUE}###${NC}"
# @if [ $$(docker-compose -f $(DOCKER_COMPOSE_FILE) ps | wc -l) -ne 4 ]; then \
# 	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d --build; \
# 	echo "${BLUE}###${NC}Docker-Compose ${GREEN}up${NC} command is done. Refer last line for status${BLUE}###${NC}"; \
# else \
# 	echo "${BLUE}###${NC}All Containers are already built${BLUE}###${NC}\n${BLUE}###${NC}Try ${RED}make stop${NC} or ${RED}make clean${NC} and built it again (${GREEN}make${NC} or ${GREEN}make all${NC})${BLUE}###${NC}"; \
# fi

stop :
	docker-compose -f $(DOCKER_COMPOSE_FILE) stop
	@echo "${BLUE}###${NC}Docker-Compose ${RED}stop${NC} command done.${BLUE}###${NC}\n${BLUE}###${NC}Refer lasts logs lines for status${BLUE}###${NC}"

clean :
	docker-compose -f $(DOCKER_COMPOSE_FILE) down -v
	@echo "${BLUE}###${NC}Docker-Compose ${RED}stop${NC} and ${RED}remove${NC} command done.${BLUE}###${NC}\n${BLUE}###${NC}Refer lasts logs lines for status${BLUE}###${NC}"

fclean : clean
	docker stop $(shell docker ps -qa); docker rm $(shell docker ps -qa); docker rmi -f $(shell docker images -qa); docker rm $(shell docker volume ls -q); docker network rm $(shell docker network ls -q) 2> /dev/null || true;
	@echo "${BLUE}###${NC}All Data from Docker are ${RED}delete${NC}.${BLUE}###${NC}\n${BLUE}###${NC}Refer lasts logs lines for status.${BLUE}###${NC}\n${BLUE}###${NC}${ORANGE}Note${NC} : message like \"docker stop requires at least 1 argument.\" can be normal.${BLUE}###${NC}"
# sudo rm -rf $(DATA_DIR)/WordPress $(DATA_DIR)/MariaDB; docker stop $(shell docker ps -qa); docker rm $(shell docker ps -qa); docker rmi -f $(shell docker images -qa); docker rm $(shell docker volume ls -q); docker network rm $(shell docker network ls -q) 2> /dev/null || true;


