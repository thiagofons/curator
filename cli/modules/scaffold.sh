#!/bin/bash

# Import UI if not already imported
source "$(dirname "$0")/../lib/ui.sh"

function menu_scaffold {
    print_header
    echo -e "${BOLD}SCAFFOLDING MENU${RESET}"
    echo -e "Choose the type of artifact to generate:\n"

    OPTIONS=(
        "Microservice (Bounded Context)"
        "Shared Library (Package)"
        "Web App"
        "🔙  Back to Main Menu"
    )

    select_option OPTIONS
    local CHOICE=$?

    case $CHOICE in
        0)
            echo -e "\n${YELLOW}🛠  Starting Microservice generator...${RESET}"
            echo -e "${DIM}Remember: High cohesion, low coupling.${RESET}\n"
            pnpm new:service
            check_status
            ;;
        1)
            echo -e "\n${YELLOW}📦  Starting Package generator...${RESET}"
            pnpm new:package
            check_status
            ;;
        2)
            echo -e "\n${YELLOW}🌐  Starting Web App generator...${RESET}"
            pnpm new:web-app
            check_status
            ;;
        3)
            return 0 # Return to main loop
            ;;
    esac
    
    # Pause to read output before clearing screen
    echo -e "\nPress [ENTER] to continue..."
    read
}

function check_status {
    if [ $? -eq 0 ]; then
        print_success "Artifact generated successfully!"
    else
        print_error "Process cancelled or failed."
    fi
}