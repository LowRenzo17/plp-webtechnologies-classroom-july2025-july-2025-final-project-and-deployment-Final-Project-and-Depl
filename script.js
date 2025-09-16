
        // Mock data for demonstration
        const mockDocuments = [
            {
                id: 1,
                type: 'id',
                name: 'John D***',
                fullName: 'John Doe',
                description: 'National ID card found near Central Park. Blue cover with a small tear on the right side.',
                location: [40.7829, -73.9654],
                foundLocation: 'Central Park West, near the entrance',
                date: '2023-10-15',
                contact: 'admin@docufind.com',
                status: 'found'
            },
            {
                id: 2,
                type: 'passport',
                name: 'Sarah M***',
                fullName: 'Sarah Miller',
                description: 'US Passport found at Airport security. Black cover with a gold emblem.',
                location: [40.6413, -73.7781],
                foundLocation: 'JFK Airport, Terminal 4 Security',
                date: '2023-10-10',
                contact: 'admin@docufind.com',
                status: 'found'
            },
            {
                id: 3,
                type: 'license',
                name: 'Robert P***',
                fullName: 'Robert Parker',
                description: 'Driver license found in taxi. Photo shows a person with glasses.',
                location: [40.7589, -73.9851],
                foundLocation: 'Times Square, Yellow Taxi #452',
                date: '2023-10-05',
                contact: 'admin@docufind.com',
                status: 'found'
            },
            {
                id: 4,
                type: 'certificate',
                name: 'Maria L***',
                fullName: 'Maria Lopez',
                description: 'University diploma found in a coffee shop. Framed with a dark wood frame.',
                location: [40.7505, -73.9934],
                foundLocation: 'Starbucks, 7th Avenue',
                date: '2023-09-28',
                contact: 'admin@docufind.com',
                status: 'found'
            }
        ];

        // Initialize map
        let map;
        function initMap() {
            map = L.map('map').setView([40.7128, -74.0060], 12);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
            
            // Add markers for mock documents
            mockDocuments.forEach(doc => {
                const marker = L.marker(doc.location).addTo(map);
                marker.bindPopup(`
                    <b>${doc.type.toUpperCase()} Found</b><br>
                    Name: ${doc.name}<br>
                    Location: ${doc.foundLocation}<br>
                    <button onclick="showDocumentDetails(${doc.id})">View Details</button>
                `);
            });
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initMap();
            setupEventListeners();
            showSection('home');
            displayMapDocuments();
        });

        // Set up event listeners
        function setupEventListeners() {
            // Report forms
            document.getElementById('reportForm').addEventListener('submit', function(e) {
                e.preventDefault();
                submitReport();
            });
            
            document.getElementById('modalReportForm').addEventListener('submit', function(e) {
                e.preventDefault();
                submitReport();
                closeModal('reportModal');
            });
            
            // Search form
            document.getElementById('searchForm').addEventListener('submit', function(e) {
                e.preventDefault();
                performSearch();
            });
            
            // Auth forms
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                login();
            });
            
            document.getElementById('registerForm').addEventListener('submit', function(e) {
                e.preventDefault();
                register();
            });
        }

        // Show a specific section
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the requested section
            document.getElementById(`${sectionId}-section`).style.display = 'block';
            
            // If showing map section, trigger resize to fix rendering
            if (sectionId === 'map') {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        // Show modals
        function showReportModal() {
            document.getElementById('reportModal').style.display = 'flex';
        }
        
        function showLoginModal() {
            document.getElementById('loginModal').style.display = 'flex';
        }
        
        function showRegisterModal() {
            document.getElementById('registerModal').style.display = 'flex';
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Perform search
        function performSearch() {
            const docType = document.getElementById('search-document-type').value;
            const name = document.getElementById('search-name').value;
            const location = document.getElementById('search-location').value;
            
            // Filter mock data based on search criteria
            const results = mockDocuments.filter(doc => {
                return (!docType || doc.type === docType) &&
                       (!name || doc.name.includes(name) || doc.fullName.toLowerCase().includes(name.toLowerCase())) &&
                       (!location || doc.foundLocation.toLowerCase().includes(location.toLowerCase()));
            });
            
            displaySearchResults(results);
        }

        // Display search results
        function displaySearchResults(results) {
            const resultsContainer = document.getElementById('search-results');
            
            if (results.length === 0) {
                resultsContainer.innerHTML = '<div class="document-card"><p>No documents found matching your criteria.</p></div>';
            } else {
                resultsContainer.innerHTML = results.map(doc => `
                    <div class="document-card">
                        <h3>${doc.type.toUpperCase()} - ${doc.name}</h3>
                        <p>${doc.description}</p>
                        <p><strong>Found at:</strong> ${doc.foundLocation}</p>
                        <p><strong>Date reported:</strong> ${doc.date}</p>
                        <button class="btn btn-primary" onclick="showDocumentDetails(${doc.id})">View Details</button>
                    </div>
                `).join('');
            }
            
            // Scroll to results
            document.getElementById('search-results-container').scrollIntoView({ behavior: 'smooth' });
        }

        // Display documents on map page
        function displayMapDocuments() {
            const container = document.getElementById('map-documents-list');
            
            container.innerHTML = mockDocuments.map(doc => `
                <div class="document-card">
                    <h3>${doc.type.toUpperCase()} - ${doc.name}</h3>
                    <p>${doc.description}</p>
                    <p><strong>Found at:</strong> ${doc.foundLocation}</p>
                    <p><strong>Date reported:</strong> ${doc.date}</p>
                    <button class="btn btn-primary" onclick="showDocumentDetails(${doc.id})">View Details</button>
                </div>
            `).join('');
        }

        // Show document details
        function showDocumentDetails(id) {
            const doc = mockDocuments.find(d => d.id === id);
            if (doc) {
                const detailsContainer = document.getElementById('document-details');
                
                detailsContainer.innerHTML = `
                    <p><strong>Document Type:</strong> ${doc.type.toUpperCase()}</p>
                    <p><strong>Name:</strong> ${doc.fullName}</p>
                    <p><strong>Description:</strong> ${doc.description}</p>
                    <p><strong>Found Location:</strong> ${doc.foundLocation}</p>
                    <p><strong>Date Reported:</strong> ${doc.date}</p>
                    <p><strong>Contact:</strong> ${doc.contact}</p>
                `;
                
                document.getElementById('detailsModal').style.display = 'flex';
            }
        }

        // Submit report
        function submitReport() {
            // In a real application, this would send data to your backend
            const reportType = document.querySelector('input[name="reportType"]:checked').value;
            const docType = document.getElementById('docType').value;
            const docName = document.getElementById('docName').value;
            
            alert(`Thank you! Your ${reportType} ${docType} report for ${docName} has been submitted.`);
            document.getElementById('reportForm').reset();
            document.getElementById('modalReportForm').reset();
        }

        // Claim document
        function claimDocument() {
            const email = prompt("Please enter your email address to claim this document:");
            if (email) {
                alert(`Thank you! We have sent a verification email to ${email}. Please follow the instructions to verify ownership.`);
                closeModal('detailsModal');
            }
        }

        // Login function
        function login() {
            const email = document.getElementById('login-email').value;
            alert(`Login functionality would authenticate with backend. Email: ${email}`);
            closeModal('loginModal');
        }

        // Register function
        function register() {
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            alert(`Registration functionality would create new account. Name: ${name}, Email: ${email}`);
            closeModal('registerModal');
        }
