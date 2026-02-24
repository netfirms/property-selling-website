.PHONY: dev deploy help

# Default target
help:
	@echo "Available commands:"
	@echo "  make dev      - Start a local development server with live reloading"
	@echo "  make deploy   - Commit and push changes to trigger GitHub Pages deployment"

# Start local development server
dev:
	@echo "Starting local live server..."
	npx live-server .

# Deploy to GitHub Pages by pushing to the main branch
deploy:
	@echo "Preparing to deploy to GitHub Pages..."
	git add .
	@read -p "Enter commit message (default: 'Update website'): " msg; \
	if [ -z "$$msg" ]; then msg="Update website"; fi; \
	git commit -m "$$msg" || true
	git push origin main
	@echo "Successfully pushed to GitHub. The GitHub Actions workflow will handle the deployment to Pages."
