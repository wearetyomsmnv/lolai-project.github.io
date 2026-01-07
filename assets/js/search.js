// Simple client-side search for LOLAI
(function() {
    'use strict';
    
    const searchInput = document.getElementById('search-input');
    const agentsGrid = document.getElementById('agents-grid');
    
    if (!searchInput || !agentsGrid) return;
    
    const agentCards = Array.from(agentsGrid.querySelectorAll('.agent-card'));
    
    // Debounce function to limit search frequency
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Search function
    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all cards
            agentCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        let visibleCount = 0;
        
        agentCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const vendor = card.querySelector('.agent-vendor')?.textContent.toLowerCase() || '';
            const category = card.dataset.category?.toLowerCase() || '';
            const platforms = card.dataset.platforms?.toLowerCase() || '';
            const capabilities = Array.from(card.querySelectorAll('.agent-capabilities li'))
                .map(li => li.textContent.toLowerCase())
                .join(' ');
            
            const searchableText = `${title} ${vendor} ${category} ${platforms} ${capabilities}`;
            
            if (searchableText.includes(searchTerm)) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show "no results" message if needed
        showNoResultsMessage(visibleCount);
    }
    
    function showNoResultsMessage(count) {
        let noResultsMsg = document.getElementById('no-results-message');
        
        if (count === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = `
                    <p>No agents found matching your search.</p>
                    <p>Try different keywords or check out all <a href="/agents/">available agents</a>.</p>
                `;
                agentsGrid.parentNode.insertBefore(noResultsMsg, agentsGrid);
            }
            noResultsMsg.style.display = 'block';
        } else {
            if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        }
    }
    
    // Add debounced search listener
    const debouncedSearch = debounce(performSearch, 300);
    searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Focus search with Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Clear search with Escape
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            performSearch('');
        }
    });
    
    // Add visual feedback for search input
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('search-focused');
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('search-focused');
    });
    
    // Category filter functionality (if filter buttons are added later)
    function setupCategoryFilters() {
        const filterButtons = document.querySelectorAll('[data-filter-category]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.filterCategory;
                
                agentCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }
    
    setupCategoryFilters();
    
    // Analytics helper (optional)
    function trackSearch(query) {
        if (window.gtag) {
            gtag('event', 'search', {
                'search_term': query
            });
        }
    }
    
    // Add search tracking on Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            trackSearch(searchInput.value);
        }
    });
    
})();
