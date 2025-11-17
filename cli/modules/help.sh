#!/bin/bash

source "$(dirname "$0")/../lib/ui.sh"

function menu_help {
    print_header
    echo -e "${BOLD}ABOUT CURATOR CLI${RESET}\n"
    echo -e "This tool standardizes service creation following our pillars:"
    echo -e "  1. ${BOLD}DDD${RESET}: Well-defined Bounded Contexts."
    echo -e "  2. ${BOLD}Hexagonal Arch${RESET}: Domain vs. Infrastructure separation."
    echo -e "  3. ${BOLD}Observability${RESET}: OpenTelemetry enabled by default.\n"
    
    echo -e "${DIM}Version: 1.0.0 | Maintainer: Architecture Team${RESET}"
    echo -e "\nPress [ENTER] to return..."
    read
}