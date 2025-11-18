#!/bin/bash

source "$(dirname "$0")/../lib/ui.sh"

function run_test_suite {
    local label=$1
    local command=$2

    echo -e "\n${YELLOW}🧪  Running: ${BOLD}$label${RESET}..."
    echo -e "${DIM}Executing command: pnpm run $command${RESET}\n"

    # Executa o comando via pnpm (que chamará o turbo)
    pnpm run "$command"
    local status=$?

    if [ $status -eq 0 ]; then
        print_success "$label completed successfully!"
    else
        print_error "$label failed. Check the logs above."
    fi
    
    echo -e "\nPress [ENTER] to continue..."
    read
}

function menu_test {
    print_header
    echo -e "${BOLD}QUALITY ASSURANCE (THE TESTING TROPHY)${RESET}"
    echo -e "Select the layer of the trophy you want to validate:\n"

    OPTIONS=(
        "1. Unit Tests (Domain Logic)"
        "2. Unit Tests + Coverage Report"
        "3. Integration Tests (Adapters/DB)"
        "4. Contract Tests (Consumer-Driven/Pact)"
        "5. E2E Tests (Critical Journeys)"
        "6. 🏆 Run Full Pipeline"
        "🔙  Back to Main Menu"
    )

    select_option OPTIONS
    local CHOICE=$?

    case $CHOICE in
        0)
            # Unit: Pure Business Logic
            echo -e "${CYAN}ℹ️  Focus: Testing Entities and Value Objects in isolation.${RESET}"
            run_test_suite "Unit Tests" "test:unit"
            ;;
        1)
            # Coverage
            echo -e "${CYAN}ℹ️  Focus: Verifying code coverage metrics against thresholds.${RESET}"
            run_test_suite "Unit Coverage" "test:unit:coverage"
            ;;
        2)
            # Integration
            echo -e "${CYAN}ℹ️  Focus: Repositories, Controllers and External Service Wrappers.${RESET}"
            run_test_suite "Integration Tests" "test:integration"
            ;;
        3)
            # Contract
            echo -e "${CYAN}ℹ️  Focus: Ensuring API providers adhere to consumer expectations (Pact).${RESET}"
            run_test_suite "Contract Tests" "test:contract"
            ;;
        4)
            # E2E
            echo -e "${CYAN}ℹ️  Focus: Simulating real user behavior across the platform.${RESET}"
            run_test_suite "E2E Tests" "test:e2e"
            ;;
        5)
            # ALL
            echo -e "${MAGENTA}🚀 Running the full quality pipeline...${RESET}"
            run_test_suite "Full Pipeline" "test:unit && test:contract && test:integration && test:e2e"
            ;;
        6)
            return 0
            ;;
    esac
}