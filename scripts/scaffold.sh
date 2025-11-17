#!/bin/bash

# ==========================================
# VISUAL STYLES & COLORS
# ==========================================
RESET="\033[0m"
BOLD="\033[1m"
DIM="\033[2m"

# Standard Colors
GREEN="\033[32m"
YELLOW="\033[33m"
RED="\033[31m"
CYAN="\033[36m"

# CUSTOM BRAND COLOR: #0060F7 (RGB: 0, 96, 247)
# \033[38;2;R;G;Bm selects the foreground color in 24-bit mode
CURATOR_BLUE="\033[38;2;0;96;247m"

# ==========================================
# HELPER FUNCTION: ARROW KEY MENU
# ==========================================
function select_option {
    local -n options=$1
    local selected=0
    local key=""

    tput civis # Hide cursor

    while true; do
        if [ -n "$key" ]; then
             for i in "${!options[@]}"; do tput cuu1; done
        fi

        for i in "${!options[@]}"; do
            if [ $i -eq $selected ]; then
                # Using the Brand Blue for selection indicator
                echo -e "${CURATOR_BLUE}${BOLD}➜  ${options[$i]}${RESET}"
            else
                echo -e "   ${options[$i]}"
            fi
        done

        read -rsn1 key 

        if [[ $key == $'\x1b' ]]; then
            read -rsn2 key 
            case $key in
                '[A') # UP
                    ((selected--))
                    if [ $selected -lt 0 ]; then selected=$((${#options[@]} - 1)); fi
                    ;;
                '[B') # DOWN
                    ((selected++))
                    if [ $selected -ge ${#options[@]} ]; then selected=0; fi
                    ;;
            esac
        elif [[ $key == "" ]]; then 
            break
        fi
    done

    tput cnorm # Show cursor
    return $selected
}

# ==========================================
# 1. WELCOME HEADER (Brand Identity)
# ==========================================
clear
echo -e "${CURATOR_BLUE}${BOLD}"
# Font: "Banner3" style (Upright/Straight)
echo "  ########  ##     ##  #######     ###    ########  #######  #######  "
echo "  ##     ## ##     ## ##     ##   ## ##      ##    ##     ## ##    ## "
echo "  ##        ##     ## ##     ##  ##   ##     ##    ##     ## ##     ##"
echo "  ##        ##     ## #######   ##     ##    ##    ##     ## #######  "
echo "  ##        ##     ## ##   ##   #########    ##    ##     ## ##   ##  "
echo "  ##     ## ##     ## ##    ##  ##     ##    ##    ##     ## ##    ## "
echo "  ########   #######  ##     ## ##     ##    ##     #######  ##     ##"
echo -e "${RESET}"

echo -e "${CURATOR_BLUE}${BOLD}>>> Digital Curation Platform - Engineering CLI${RESET}"
echo -e "${DIM}Welcome, Architect. Ready to expand the Curator domain?${RESET}\n"

# ==========================================
# 2. ARTIFACT SELECTION
# ==========================================
echo -e "${BOLD}What would you like to create today?${RESET} (Use arrows to navigate)"

MENU_OPTIONS=(
    "New Microservice (Bounded Context)"
    "New Shared Library (Package)"
    "Exit"
)

select_option MENU_OPTIONS
CHOICE=$?

case $CHOICE in
    0)
        echo -e "\n${YELLOW}🛠  Starting Microservice scaffolding...${RESET}"
        echo -e "${DIM}Reminder: A service must have high cohesion and low coupling.${RESET}\n"
        npm run new:service
        STATUS=$?
        ;;
    1)
        echo -e "\n${YELLOW}📦  Starting Package scaffolding...${RESET}"
        echo -e "${DIM}Reminder: Shared code must be domain-agnostic.${RESET}\n"
        npm run new:package
        STATUS=$?
        ;;
    2)
        echo -e "\nSee you soon!"
        exit 0
        ;;
esac

# ==========================================
# 3. FINAL MESSAGE
# ==========================================

if [ $STATUS -eq 0 ]; then
    echo -e "\n"
    echo -e "${GREEN}**************************************************${RESET}"
    echo -e "${GREEN}* SCAFFOLDING COMPLETED SUCCESSFULLY!            *${RESET}"
    echo -e "${GREEN}**************************************************${RESET}"
    echo -e ""
    echo -e "The new artifact is now integrated into the Monorepo."
    echo -e ""
    echo -e "${BOLD}Recommended Next Steps:${RESET}"
    echo -e "  1. Review the generated files."
    echo -e "  2. Run ${CYAN}pnpm install${RESET} to link dependencies."
    echo -e "  3. Run ${CYAN}pnpm test${RESET} to ensure the base template is green."
    echo -e ""
    echo -e "Happy Coding! 🚀"
    echo -e ""
else
    echo -e "\n${RED}❌ An error occurred during generation or the process was cancelled.${RESET}"
fi