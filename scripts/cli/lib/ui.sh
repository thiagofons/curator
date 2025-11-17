#!/bin/bash

# ==========================================
# COLORS & STYLES
# ==========================================
RESET="\033[0m"
BOLD="\033[1m"
DIM="\033[2m"

# Brand Color: Curator Blue (#0060F7)
CURATOR_BLUE="\033[38;2;0;96;247m"
GREEN="\033[32m"
RED="\033[31m"
YELLOW="\033[33m"
CYAN="\033[36m"

# ==========================================
# VISUAL COMPONENTS
# ==========================================

function print_header {
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
    echo -e "${DIM}Architecture & Engineering Team${RESET}\n"
}

function print_success {
    local msg="$1"
    echo -e "\n${GREEN}✅  ${msg}${RESET}"
}

function print_error {
    local msg="$1"
    echo -e "\n${RED}❌  ${msg}${RESET}"
}

function print_info {
    local msg="$1"
    echo -e "${CYAN}ℹ️   ${msg}${RESET}"
}

# ==========================================
# MENU LOGIC (ARROW KEYS)
# ==========================================
function select_option {
    local -n options=$1
    local selected=0
    local key=""

    tput civis # Hide cursor

    while true; do
        # Move cursor up to redraw menu if not first run
        if [ -n "$key" ]; then
             for i in "${!options[@]}"; do tput cuu1; done
        fi

        for i in "${!options[@]}"; do
            if [ $i -eq $selected ]; then
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
            break # Enter pressed
        fi
    done

    tput cnorm # Show cursor
    return $selected
}