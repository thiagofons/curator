#!/bin/bash

# Import UI if not already imported
source "$(dirname "$0")/../lib/ui.sh"

# ==========================================
# HELPER: EXECUTION WRAPPER
# ==========================================
function run_docker_task {
    local label=$1
    local command=$2

    echo -e "\n${YELLOW}🐳  Docker Task: ${BOLD}$label${RESET}..."
    echo -e "${DIM}Executing: pnpm run $command${RESET}\n"

    # Execute via pnpm
    pnpm run "$command"
    local status=$?

    if [ $status -eq 0 ]; then
        print_success "Command executed successfully!"
    else
        print_error "Command failed. Is the Docker daemon running?"
    fi
    
    echo -e "\nPress [ENTER] to continue..."
    read
}

# ==========================================
# LEVEL 2: ACTION SELECTION
# ==========================================
function menu_docker_action {
    local group_name=$1      # Visual Name (e.g., "Core Infra")
    local script_prefix=$2   # Script prefix (e.g., "compose:core")

    echo -e "\n${BOLD}Manage: $group_name${RESET}"
    echo -e "Select the action to perform:\n"

    OPTIONS=(
        "🟢  Start (UP -d)"
        "🔴  Stop (DOWN)"
        "🔙  Back"
    )

    select_option OPTIONS
    local CHOICE=$?

    case $CHOICE in
        0)
            # START
            # Logic: Since user scripts are "compose:core" (without :up suffix) 
            # and "compose:observability" (without :up suffix), we use the prefix directly.
            run_docker_task "Start $group_name" "$script_prefix"
            ;;
        1)
            # STOP
            # Logic: User scripts for stopping have the ":down" suffix
            run_docker_task "Stop $group_name" "${script_prefix}:down"
            ;;
        2)
            return 0 # Go back
            ;;
    esac
}

# ==========================================
# LEVEL 1: GROUP SELECTION
# ==========================================
function menu_docker {
    while true; do
        print_header
        echo -e "${BOLD}LOCAL INFRASTRUCTURE (DOCKER)${RESET}"
        echo -e "Select the container group you want to manage:\n"

        OPTIONS=(
            "1. 🧱 Core Infrastructure (DBs, Brokers, Apps)"
            "2. 🔭 Observability Stack (Grafana, Prometheus)"
            "3. 🧨 Global Operations (Clean Up)"
            "🔙  Back to Main Menu"
        )

        select_option OPTIONS
        local CHOICE=$?

        case $CHOICE in
            0)
                # Maps to scripts: compose:core / compose:core:down
                menu_docker_action "Core Infrastructure" "compose:core"
                ;;
            1)
                # Maps to scripts: compose:observability / compose:observability:down
                menu_docker_action "Observability Stack" "compose:observability"
                ;;
            2)
                # Special menu for Global Actions
                echo -e "\n${BOLD}Global Operations${RESET}\n"
                GLOBAL_OPS=(
                    "🔴  Stop EVERYTHING (Remove Orphans)"
                    "🔙  Back"
                )
                select_option GLOBAL_OPS
                local GLOBAL_CHOICE=$?
                
                if [ $GLOBAL_CHOICE -eq 0 ]; then
                    run_docker_task "Nuke Environment" "compose:down"
                fi
                ;;
            3)
                return 0 # Exit to Main Menu
                ;;
        esac
    done
}