
# CONFIGURATION
################


KEY_LOCATION ?= "" # Path to the extension key (*.pem).

WORKPATH := $(abspath $(lastword $(MAKEFILE_LIST)))
WORKDIR := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))

.DEFAULT_GOAL:= help
.PHONY: clean help


# HELP
#######

help: # Display a list of all parameters and targets in this Makefile
	@echo "\nPARAMETERS:"
	@grep -E '^[a-zA-Z\_-]+ \?= .*#.*$$' Makefile | tr '?' '#' | tr -d '=' \
		| awk 'BEGIN {FS=" #[ \t]+"}; {printf "\033[36m%-30s\033[0m %s (Default: %s)\n", $$1, $$3, $$2}'
	@echo "\nTARGETS:"
	@grep -E '^([a-zA-Z\.\_-]+):.*#.*$$' Makefile | awk 'BEGIN {FS=":.*#[ \t]+"}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


# TARGETS
##########

package: # Package the extension.
	google-chrome --pack-extension=$(WORKDIRK)/src --pack-extension-key=$(KEY_LOCATION)
	mv src.crx leanbro.crx

clean: # Clean the working directory.
	rm *.crx
