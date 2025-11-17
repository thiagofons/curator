#!/bin/bash

# ==========================================
# INITIAL SETUP
# ==========================================

# Determine base directory to allow relative imports
BASE_DIR="$(dirname "$0")"

# Import UI Library
source "$BASE_DIR/lib/ui.sh"

# Import Business Modules
source "$BASE_DIR/modules/build.sh"
source "$BASE_DIR/modules/docker.sh"   
source "$BASE_DIR/modules/help.sh"
source "$BASE_DIR/modules/scaffold.sh"
source "$BASE_DIR/modules/test.sh"

# ==========================================
# MAIN LOOP
# ==========================================

while true; do
    print_header
    
    echo -e "${BOLD}MAIN MENU${RESET}"
    echo -e "What would you like to do today?\n"

    # Menu Options Definition
    MAIN_OPTIONS=(
        "🚀  Scaffold (Create new artifact)"
        "🐳  Docker & Infra (Manage Containers)" 
        "🔨  Build (Compile & Bundle)"
        "🧪  Test & QA (The Trophy)"
        "📚  Help / About"
        "❌  Exit"
    )

    # Render Menu and Capture Selection
    select_option MAIN_OPTIONS
    CHOICE=$?

    # Route Logic
    case $CHOICE in
        0) menu_scaffold ;;
        1) menu_docker ;;
        2) menu_build ;;  # <--- Route to Build Module
        3) menu_test ;;
        4) menu_help ;;
        5)
            echo -e "\n${DIM}Shutting down Curator CLI. Happy Coding!${RESET}\n"
            exit 0
            ;;
    esac
done