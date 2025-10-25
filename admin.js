// Admin Panel JavaScript - APPWRITE VERSION

// Check admin authentication on page load
(async () => {
    try {
        const user = await appwrite.helpers.getCurrentUser();
        if (!user || user.email !== appwrite.config.ADMIN_EMAIL) {
            window.location.href = 'login.html';
            return;
        }
        loadAdminDashboard();
    } catch (error) {
        console.error('Auth error:', error);
        window.location.href = 'login.html';
    }
})();

// Load admin dashboard
function loadAdminDashboard() {
    loadDashboardStats();
    loadProposalsData();
    loadMeetingsData();
    loadUsersData();
    loadContactsData();
    loadMediaData();
}

// Show admin section
function showAdminSection(section) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`admin-${section}`)?.classList.add('active');
    event.target.closest('.admin-nav-item')?.classList.add('active');
    
    const titles = {
        'dashboard': 'Dashboard',
        'proposals': 'Proposals Management',
        'meetings': 'Meetings Management',
        'users': 'Users Management',
        'contacts': 'Contact Messages',
        'media': 'Media Library',
        'analytics': 'Analytics',
        'seo': 'SEO Settings',
        'settings': 'General Settings'
    };
    
    const titleElement = document.getElementById('adminSectionTitle');
    if (titleElement) {
        titleElement.textContent = titles[section] || 'Admin Panel';
    }
}

// Load dashboard stats
async function loadDashboardStats() {
    try {
        // Load users count
        const usersResponse = await appwrite.helpers.listDocuments(appwrite.config.COLLECTIONS.USERS);
        document.getElementById('totalUsers').textContent = usersResponse.total || 0;

        // Load proposals count
        const proposalsResponse = await appwrite.helpers.listDocuments(appwrite.config.COLLECTIONS.PROPOSALS);
        document.getElementById('totalProposals').textContent = proposalsResponse.total || 0;

        // Count pending proposals
        const pendingProposals = proposalsResponse.documents.filter(doc => doc.status === 'pending');
        document.getElementById('pendingProposals').textContent = pendingProposals.length;

        // Load meetings count
        const meetingsResponse = await appwrite.helpers.listDocuments(appwrite.config.COLLECTIONS.MEETINGS);
        document.getElementById('totalMeetings').textContent = meetingsResponse.total || 0;

        loadRecentProposals();
        loadUpcomingMeetings();
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load recent proposals
async function loadRecentProposals() {
    try {
        const response = await appwrite.helpers.listDocuments(
            appwrite.config.COLLECTIONS.PROPOSALS,
            [appwrite.Query.orderDesc('createdAt'), appwrite.Query.limit(5)]
        );

        const container = document.getElementById('recentProposals');
        if (!container) return;

        container.innerHTML = '';

        if (response.documents.length === 0) {
            container.innerHTML = '<p style="padding: 1rem; text-align: center; color: #666;">No proposals yet</p>';
            return;
        }

        response.documents.forEach(doc => {
            const div = document.createElement('div');
            div.style.cssText = 'padding: 1rem; border-bottom: 1px solid #ddd;';
            div.innerHTML = `
                <strong>${doc.title}</strong><br>
                <small>${doc.userName} - ${new Date(doc.createdAt).toLocaleDateString()}</small>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading recent proposals:', error);
    }
}

// Load upcoming meetings
async function loadUpcomingMeetings() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await appwrite.helpers.listDocuments(
            appwrite.config.COLLECTIONS.MEETINGS,
            [
                appwrite.Query.greaterThanEqual('date', today),
                appwrite.Query.orderAsc('date'),
                appwrite.Query.limit(5)
            ]
        );

        const container = document.getElementById('upcomingMeetings');
        if (!container) return;

        container.innerHTML = '';

        if (response.documents.length === 0) {
            container.innerHTML = '<p style="padding: 1rem; text-align: center; color: #666;">No upcoming meetings</p>';
            return;
        }

        response.documents.forEach(doc => {
            const div = document.createElement('div');
            div.style.cssText = 'padding: 1rem; border-bottom: 1px solid #ddd;';
            div.innerHTML = `
                <strong>${doc.purpose}</strong><br>
                <small>${doc.userName} - ${doc.date} at ${doc.time}</small>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading upcoming meetings:', error);
    }
}

// Load proposals data
let allProposals = [];

async function loadProposalsData() {
    try {
        const response = await appwrite.helpers.listDocuments(
            appwrite.config.COLLECTIONS.PROPOSALS,
            [appwrite.Query.orderDesc('createdAt')]
        );

        allProposals = response.documents;
        displayProposals(allProposals);
    } catch (error) {
        console.error('Error loading proposals:', error);
    }
}

// Display proposals
function displayProposals(proposals) {
    const tbody = document.getElementById('proposalsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (proposals.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #666;">No proposals found</td></tr>';
        return;
    }

    proposals.forEach(proposal => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${new Date(proposal.createdAt).toLocaleDateString()}</td>
            <td>${proposal.userName}</td>
            <td>${proposal.title}</td>
            <td>${proposal.type}</td>
            <td><span class="status-badge status-${proposal.status}">${proposal.status}</span></td>
            <td>
                <button onclick="viewProposal('${proposal.$id}')" class="btn-small">View</button>
                <button onclick="deleteProposal('${proposal.$id}')" class="btn-small btn-danger">Delete</button>
            </td>
        `;
    });
}

// View proposal
async function viewProposal(proposalId) {
    try {
        const proposal = await appwrite.helpers.getDocument(appwrite.config.COLLECTIONS.PROPOSALS, proposalId);
        
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <h2>Proposal Details</h2>
                <p><strong>Title:</strong> ${proposal.title}</p>
                <p><strong>Type:</strong> ${proposal.type}</p>
                <p><strong>Budget:</strong> ${proposal.budget || 'Not specified'}</p>
                <p><strong>Timeline:</strong> ${proposal.timeline}</p>
                <p><strong>Start Date:</strong> ${proposal.startDate || 'Not specified'}</p>
                <p><strong>Status:</strong> ${proposal.status}</p>
                <p><strong>Description:</strong></p>
                <p>${proposal.description}</p>
                <p><strong>Submitted by:</strong> ${proposal.userName} (${proposal.userEmail})</p>
                <div style="margin-top: 1rem;">
                    <label><strong>Admin Response:</strong></label>
                    <textarea id="adminResponse" rows="4" style="width: 100%; padding: 0.5rem;">${proposal.adminResponse || ''}</textarea>
                </div>
                <div style="margin-top: 1rem;">
                    <label><strong>Status:</strong></label>
                    <select id="proposalStatus" style="width: 100%; padding: 0.5rem;">
                        <option value="pending" ${proposal.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="approved" ${proposal.status === 'approved' ? 'selected' : ''}>Approved</option>
                        <option value="rejected" ${proposal.status === 'rejected' ? 'selected' : ''}>Rejected</option>
                        <option value="in-progress" ${proposal.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="completed" ${proposal.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
                <div style="margin-top: 1rem; display: flex; gap: 1rem;">
                    <button onclick="updateProposal('${proposalId}')" class="btn-primary">Update</button>
                    <button onclick="closeModal()" class="btn-secondary">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
        window.currentModal = modal;
    } catch (error) {
        alert('Error loading proposal: ' + error.message);
    }
}

// Update proposal
async function updateProposal(proposalId) {
    try {
        const response = document.getElementById('adminResponse').value;
        const status = document.getElementById('proposalStatus').value;
        
        await appwrite.helpers.updateDocument(
            appwrite.config.COLLECTIONS.PROPOSALS,
            proposalId,
            { adminResponse: response, status: status }
        );
        
        alert('Proposal updated successfully!');
        closeModal();
        loadProposalsData();
    } catch (error) {
        alert('Error updating proposal: ' + error.message);
    }
}

// Delete proposal
async function deleteProposal(proposalId) {
    if (!confirm('Are you sure you want to delete this proposal?')) return;
    
    try {
        await appwrite.helpers.deleteDocument(appwrite.config.COLLECTIONS.PROPOSALS, proposalId);
        alert('Proposal deleted successfully!');
        loadProposalsData();
    } catch (error) {
        alert('Error deleting proposal: ' + error.message);
    }
}

// Close modal
function closeModal() {
    if (window.currentModal) {
        window.currentModal.remove();
        window.currentModal = null;
    }
}

// Load meetings data
async function loadMeetingsData() {
    try {
        const response = await appwrite.helpers.listDocuments(
            appwrite.config.COLLECTIONS.MEETINGS,
            [appwrite.Query.orderDesc('createdAt')]
        );

        const tbody = document.getElementById('meetingsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (response.documents.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #666;">No meetings found</td></tr>';
            return;
        }

        response.documents.forEach(meeting => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${meeting.date}</td>
                <td>${meeting.time}</td>
                <td>${meeting.userName}</td>
                <td>${meeting.purpose}</td>
                <td><span class="status-badge status-${meeting.status}">${meeting.status}</span></td>
                <td>
                    <button onclick="viewMeeting('${meeting.$id}')" class="btn-small">View</button>
                    <button onclick="deleteMeeting('${meeting.$id}')" class="btn-small btn-danger">Delete</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error loading meetings:', error);
    }
}

// View meeting (similar to viewProposal)
async function viewMeeting(meetingId) {
    try {
        const meeting = await appwrite.helpers.getDocument(appwrite.config.COLLECTIONS.MEETINGS, meetingId);
        
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <h2>Meeting Details</h2>
                <p><strong>Purpose:</strong> ${meeting.purpose}</p>
                <p><strong>Date:</strong> ${meeting.date}</p>
                <p><strong>Time:</strong> ${meeting.time}</p>
                <p><strong>Duration:</strong> ${meeting.duration} minutes</p>
                <p><strong>Mode:</strong> ${meeting.mode}</p>
                <p><strong>Status:</strong> ${meeting.status}</p>
                <p><strong>Agenda:</strong></p>
                <p>${meeting.agenda}</p>
                <p><strong>Requested by:</strong> ${meeting.userName} (${meeting.userEmail})</p>
                ${meeting.status === 'pending' ? `
                <div style="margin-top: 1rem;">
                    <label><strong>Meeting Link:</strong></label>
                    <input type="text" id="meetingLink" value="${meeting.meetingLink || ''}" style="width: 100%; padding: 0.5rem;">
                </div>
                <div style="margin-top: 1rem;">
                    <label><strong>Status:</strong></label>
                    <select id="meetingStatus" style="width: 100%; padding: 0.5rem;">
                        <option value="pending" ${meeting.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${meeting.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="cancelled" ${meeting.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        <option value="completed" ${meeting.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
                <div style="margin-top: 1rem; display: flex; gap: 1rem;">
                    <button onclick="updateMeeting('${meetingId}')" class="btn-primary">Update</button>
                    <button onclick="closeModal()" class="btn-secondary">Close</button>
                </div>
                ` : '<button onclick="closeModal()" class="btn-secondary" style="margin-top: 1rem;">Close</button>'}
            </div>
        `;
        document.body.appendChild(modal);
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
        window.currentModal = modal;
    } catch (error) {
        alert('Error loading meeting: ' + error.message);
    }
}

// Update meeting
async function updateMeeting(meetingId) {
    try {
        const meetingLink = document.getElementById('meetingLink').value;
        const status = document.getElementById('meetingStatus').value;
        
        await appwrite.helpers.updateDocument(
            appwrite.config.COLLECTIONS.MEETINGS,
            meetingId,
            { meetingLink, status }
        );
        
        alert('Meeting updated successfully!');
        closeModal();
        loadMeetingsData();
    } catch (error) {
        alert('Error updating meeting: ' + error.message);
    }
}

// Delete meeting
async function deleteMeeting(meetingId) {
    if (!confirm('Are you sure you want to delete this meeting?')) return;
    
    try {
        await appwrite.helpers.deleteDocument(appwrite.config.COLLECTIONS.MEETINGS, meetingId);
        alert('Meeting deleted successfully!');
        loadMeetingsData();
    } catch (error) {
        alert('Error deleting meeting: ' + error.message);
    }
}

// Load users data
async function loadUsersData() {
    try {
        const response = await appwrite.helpers.listDocuments(appwrite.config.COLLECTIONS.USERS);

        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (response.documents.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #666;">No users found</td></tr>';
            return;
        }

        response.documents.forEach(user => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.organization || 'N/A'}</td>
                <td>${user.role || 'N/A'}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
            `;
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Load contacts data
async function loadContactsData() {
    try {
        const response = await appwrite.helpers.listDocuments(
            appwrite.config.COLLECTIONS.CONTACTS,
            [appwrite.Query.orderDesc('createdAt')]
        );

        const tbody = document.getElementById('contactsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (response.documents.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #666;">No contact messages found</td></tr>';
            return;
        }

        response.documents.forEach(contact => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${new Date(contact.createdAt).toLocaleDateString()}</td>
                <td>${contact.firstName} ${contact.lastName}</td>
                <td>${contact.email}</td>
                <td>${contact.subject}</td>
                <td>
                    <button onclick="viewContact('${contact.$id}')" class="btn-small">View</button>
                    <button onclick="deleteContact('${contact.$id}')" class="btn-small btn-danger">Delete</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

// View contact
async function viewContact(contactId) {
    try {
        const contact = await appwrite.helpers.getDocument(appwrite.config.COLLECTIONS.CONTACTS, contactId);
        
        alert(`Name: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'N/A'}\nOrganization: ${contact.organization || 'N/A'}\nSubject: ${contact.subject}\nBudget: ${contact.budget || 'N/A'}\nTimeline: ${contact.timeline || 'N/A'}\n\nMessage:\n${contact.message}`);
    } catch (error) {
        alert('Error loading contact: ' + error.message);
    }
}

// Delete contact
async function deleteContact(contactId) {
    if (!confirm('Are you sure you want to delete this contact message?')) return;
    
    try {
        await appwrite.helpers.deleteDocument(appwrite.config.COLLECTIONS.CONTACTS, contactId);
        alert('Contact deleted successfully!');
        loadContactsData();
    } catch (error) {
        alert('Error deleting contact: ' + error.message);
    }
}

// Load media data
async function loadMediaData() {
    try {
        const response = await appwrite.helpers.listFiles();

        const container = document.getElementById('mediaGrid');
        if (!container) return;

        container.innerHTML = '';

        if (response.files.length === 0) {
            container.innerHTML = '<p style="padding: 2rem; text-align: center; color: #666;">No media uploaded yet</p>';
            return;
        }

        response.files.forEach(file => {
            const card = document.createElement('div');
            card.className = 'media-card';
            card.style.cssText = 'border: 1px solid #ddd; padding: 1rem; border-radius: 8px; text-align: center;';
            
            const isImage = file.mimeType?.startsWith('image/');
            const isVideo = file.mimeType?.startsWith('video/');
            
            if (isImage) {
                const imgUrl = appwrite.helpers.getFilePreview(file.$id);
                card.innerHTML = `
                    <img src="${imgUrl}" style="max-width: 100%; height: auto; border-radius: 4px;">
                    <p style="margin-top: 0.5rem; font-size: 0.875rem;">${file.name}</p>
                    <button onclick="deleteMedia('${file.$id}')" class="btn-small btn-danger">Delete</button>
                `;
            } else if (isVideo) {
                const videoUrl = appwrite.helpers.getFileView(file.$id);
                card.innerHTML = `
                    <video controls style="max-width: 100%; height: auto;">
                        <source src="${videoUrl}" type="${file.mimeType}">
                    </video>
                    <p style="margin-top: 0.5rem; font-size: 0.875rem;">${file.name}</p>
                    <button onclick="deleteMedia('${file.$id}')" class="btn-small btn-danger">Delete</button>
                `;
            } else {
                card.innerHTML = `
                    <p>${file.name}</p>
                    <p style="font-size: 0.75rem; color: #666;">${(file.sizeOriginal / 1024).toFixed(2)} KB</p>
                    <button onclick="deleteMedia('${file.$id}')" class="btn-small btn-danger">Delete</button>
                `;
            }
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading media:', error);
    }
}

// Delete media
async function deleteMedia(fileId) {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
        await appwrite.helpers.deleteFile(fileId);
        alert('File deleted successfully!');
        loadMediaData();
    } catch (error) {
        alert('Error deleting file: ' + error.message);
    }
}

// Logout
async function logout() {
    try {
        await appwrite.helpers.logout();
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}
