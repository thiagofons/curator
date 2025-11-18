#!/bin/bash

# Import UI if not already imported
source "$(dirname "$0")/../lib/ui.sh"

function run_build_task {
    local label=$1
    local command=$2

    echo -e "\n${YELLOW}🔨  Build Task: ${BOLD}$label${RESET}..."
    echo -e "${DIM}Executing: $command${RESET}\n"

    # Execute command
    eval "$command"
    local status=$?

    if [ $status -eq 0 ]; then
        print_success "Build completed successfully!"
    else
        print_error "Build failed. Check the logs above."
    fi
    
    echo -e "\nPress [ENTER] to continue..."
    read
}

function select_artifact_and_build {
    echo -e "\n${CYAN}🔍  Scanning monorepo structure...${RESET}"

    # Lists to store Display Names and Actual Paths in sync
    local display_options=()
    local paths=()

    # Helper function to scan directories
    function scan_dir {
        local base_path=$1    # e.g., "apps/backend"
        local type_label=$2   # e.g., "[Backend]"
        local icon=$3         # e.g., "🧱"

        if [ -d "$base_path" ]; then
            # Iterate over directories inside the base path
            for d in "$base_path"/*/; do
                # Check if it exists (handle empty dirs)
                [ -d "$d" ] || continue
                
                # Get folder name (e.g., "identity-service")
                local dirname=$(basename "$d")
                
                # Add to arrays
                display_options+=("$icon $type_label $dirname")
                paths+=("${d%/}") # Remove trailing slash
            done
        fi
    }

    # 1. Scan Backend Services
    scan_dir "apps/backend" "[BE]" "⚙️ "

    # 2. Scan Frontend Applications
    scan_dir "apps/frontend" "[FE]" "🖥️ "

    # 3. Scan E2E Projects
    scan_dir "apps/e2e" "[E2E]" "🤖"

    # 4. Scan Shared Packages
    scan_dir "packages" "[Lib]" "📦"

    # Add Exit Option
    display_options+=("🔙  Cancel")

    # 5. Show Menu
    if [ ${#paths[@]} -eq 0 ]; then
        print_error "No artifacts found in apps/ or packages/."
        return
    fi

    echo -e "${BOLD}Select the target to build:${RESET}"
    select_option display_options
    local choice=$?

    # 6. Process Selection
    # Check if "Cancel" was selected (last index)
    if [ $choice -eq ${#paths[@]} ]; then
        return 0
    fi

    # Get the corresponding path from the parallel array
    local selected_path="${paths[$choice]}"
    # Extract just the name for the label (optional, for UI)
    local target_name=$(basename "$selected_path")

    # 7. Construct Command
    # We use the path filter: ./apps/backend/identity...
    # The '...' ensures dependencies are built first
    local cmd="pnpm build --filter=\"./$selected_path...\""

    echo -e "${CYAN}ℹ️   Targeting path: ${BOLD}./$selected_path${RESET} (and upstream dependencies)"
    run_build_task "Build $target_name" "$cmd"
}

function menu_build {
    print_header
    echo -e "${BOLD}BUILD SYSTEM${RESET}"
    echo -e "Compile TypeScript, bundle assets, and prepare for deployment.\n"

    OPTIONS=(
        "1. 🌍 Build Entire Monorepo"
        "2. 🎯 Build Specific Artifact (+ dependencies)"
        "🔙  Back to Main Menu"
    )

    select_option OPTIONS
    local CHOICE=$?

    case $CHOICE in
        0)
            # Build All
            echo -e "${CYAN}ℹ️   This will build every app and package in the workspace.${RESET}"
            run_build_task "Full Monorepo Build" "pnpm build"
            ;;
        1)
            # Build Specific (Dynamic Scan)
            select_artifact_and_build
            ;;
        2)
            return 0
            ;;
    esac
}