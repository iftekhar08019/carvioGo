#!/bin/bash

# Git Auto Push Script
# This script automatically adds, commits, and pushes changes to GitHub

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Git auto-push process...${NC}"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

# Check if there are any changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ No changes to commit${NC}"
    exit 0
fi

# Get the current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Show what files have changed
echo -e "${YELLOW}📁 Changed files:${NC}"
git status --porcelain | while read -r line; do
    status=${line:0:2}
    file=${line:3}
    case $status in
        "M ") echo -e "  ${GREEN}Modified:${NC} $file" ;;
        "A ") echo -e "  ${BLUE}Added:${NC} $file" ;;
        "D ") echo -e "  ${RED}Deleted:${NC} $file" ;;
        "R ") echo -e "  ${YELLOW}Renamed:${NC} $file" ;;
        *) echo -e "  ${YELLOW}Other:${NC} $file" ;;
    esac
done

# Add all changes
echo -e "${BLUE}📁 Adding all changes...${NC}"
git add .

# Create commit message
COMMIT_MSG="Auto-commit: $TIMESTAMP"
if [ -n "$1" ]; then
    COMMIT_MSG="$1 - $TIMESTAMP"
fi

# Commit with timestamp
echo -e "${BLUE}💾 Committing changes...${NC}"
git commit -m "$COMMIT_MSG"

# Push to remote repository
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo -e "${GREEN}🕒 Timestamp: $TIMESTAMP${NC}"
    echo -e "${GREEN}🔗 Repository: https://github.com/iftekhar08019/carvioGo.git${NC}"
else
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    echo -e "${YELLOW}💡 Try running: git pull origin main${NC}"
    exit 1
fi
