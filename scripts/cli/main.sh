#!/bin/bash

# Determine base directory for relative imports
BASE_DIR="$(dirname "$0")"

# Import Library and Modules
source "$BASE_DIR/lib/ui.sh"
source "$BASE_DIR/modules/scaffold.sh"
source "$BASE_DIR/modules/help.sh"

# ==========================================
# MAIN LOOP
# ==========================================

while true; do
    print_header
    echo -e "${BOLD}MAIN MENU${RESET}"
    echo -e "What would you like to do?\n"

    MAIN_OPTIONS=(
        "🚀  Scaffold (Create new artifact)"
        "📚  Help / About"
        "❌  Exit"
    )

    select_option MAIN_OPTIONS
    CHOICE=$?

    case $CHOICE in
        0)
            menu_scaffold
            ;;
        1)
            menu_help
            ;;
        2)
            echo -e "\n${DIM}Shutting down Curator CLI. Happy Coding!${RESET}\n"
            exit 0
            ;;
    esac
done