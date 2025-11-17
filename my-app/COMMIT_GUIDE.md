# Commit Guide for Home Page Enhancements

## Branch Creation

```powershell
git checkout -b feature/home-accessibility-ux
```

## Suggested Commit Sequence

### Commit 1: AccessibleProductCard Component

```powershell
git add src/pages/Home.jsx
git commit -m "feat(home): add AccessibleProductCard component and keyboard handlers

- Create reusable AccessibleProductCard component
- Add keyboard navigation (Enter/Space key support)
- Implement proper ARIA labels and roles
- Add srcSet and lazy loading for images
- Include defensive analytics tracking"
```

### Commit 2: Featured Collections Section

```powershell
git add src/pages/Home.jsx src/pages/Home.css
git commit -m "feat(home): add Featured Collections section above new arrivals

- Add 3 collection tiles (Summer, Workwear, Streetwear)
- Implement keyboard accessibility for collection tiles
- Add hover effects and responsive grid layout
- Include analytics tracking for collection clicks
- Link to /shop/collection/<slug> routes"
```

### Commit 3: Newsletter Band

```powershell
git add src/pages/Home.jsx src/pages/Home.css
git commit -m "feat(home): add NewsletterBand with client-side submit and analytics

- Create self-contained NewsletterBand component
- Implement email validation and form handling
- Add localStorage fallback for offline functionality
- Include ARIA live regions for status messages
- Add analytics tracking for subscriptions"
```

### Commit 4: Performance Optimizations

```powershell
git add src/pages/Home.jsx src/pages/Home.css
git commit -m "perf(home): add srcSet and lazy-loading to product images

- Implement lazy loading on all non-hero images
- Add srcSet and sizes attributes for responsive images
- Optimize hero image with responsive attributes
- Add prefers-reduced-motion support in JS and CSS
- Optimize IntersectionObserver for animations"
```

### Commit 5: Top Selling Enhancements

```powershell
git add src/pages/Home.jsx src/pages/Home.css
git commit -m "feat(home): enhance Top Selling section with accessibility

- Add featured card layout with CTA overlay button
- Implement keyboard navigation for all cards
- Show original price strikethrough for discounts
- Add proper ARIA labels and focus indicators
- Include analytics tracking for product clicks"
```

### Commit 6: Tests

```powershell
git add src/__tests__/
git commit -m "test(home): add tests for AccessibleProductCard and NewsletterBand

- Add comprehensive tests for AccessibleProductCard
  - Keyboard navigation (Enter/Space)
  - Analytics tracking
  - Accessibility attributes
  - Image lazy loading and srcSet
- Add NewsletterBand tests
  - Form submission flow
  - API success and failure scenarios
  - localStorage fallback
  - Analytics integration
- Add Home component smoke tests
  - Rendering verification
  - Semantic HTML structure
  - Reduced motion support"
```

### Commit 7: CSS and Accessibility

```powershell
git add src/pages/Home.css
git commit -m "chore(css): prefer-reduced-motion rules and minor layout tweaks

- Add prefers-reduced-motion media query
- Disable animations when user prefers reduced motion
- Add focus indicators for all interactive elements
- Update responsive breakpoints for new sections
- Add newsletter band styles with gradient background"
```

### Commit 8: Documentation

```powershell
git add ACCESSIBILITY_UX_ENHANCEMENTS.md PR_SUMMARY.md
git commit -m "docs: add comprehensive testing and implementation documentation

- Add detailed testing instructions
- Document all accessibility improvements
- Include analytics event reference
- Add manual testing checklist
- Document future improvement suggestions"
```

## Push to Remote

```powershell
git push -u origin feature/home-accessibility-ux
```

## Create Pull Request

After pushing, create a PR on GitHub/GitLab with:

- Title: "Home Page Accessibility & UX Enhancements"
- Description: Use content from `PR_SUMMARY.md`
- Labels: `enhancement`, `accessibility`, `performance`
- Reviewers: Add team members
- Milestone: Current sprint/release

## Alternative: Single Commit (if preferred)

```powershell
git add .
git commit -m "feat(home): comprehensive accessibility and UX enhancements

- Add AccessibleProductCard component with keyboard navigation
- Implement Featured Collections section above New Arrivals
- Add NewsletterBand with email signup and analytics
- Enhance Top Selling section with featured card and CTA
- Add performance optimizations (lazy loading, srcSet)
- Implement prefers-reduced-motion support
- Add comprehensive test suite
- Include analytics tracking for all CTAs

BREAKING CHANGE: None
Closes #[issue-number]"
```

## Verification Before Commit

Run these commands to ensure quality:

```powershell
# Lint check
npm run lint

# Run tests
npm test

# Build check
npm run build

# Check for console errors
npm start
# Then manually test in browser
```

## Git Workflow Summary

1. ✅ Create feature branch
2. ✅ Make focused commits with clear messages
3. ✅ Run tests before each commit
4. ✅ Push to remote
5. ✅ Create pull request
6. ✅ Request reviews
7. ✅ Address feedback
8. ✅ Merge when approved

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore
**Scope**: home, css, tests, docs
**Subject**: Imperative, present tense, lowercase, no period
**Body**: Detailed explanation (optional)
**Footer**: Breaking changes, issue references
