async function fetchRepositories() {
    const username = document.getElementById('username').value;
    const profileContainer = document.getElementById('profile');
    const repositoriesContainer = document.getElementById('repositories');
    repositoriesContainer.innerHTML = '';
     // Clear previous results

    profileContainer.innerHTML = '';
    repositoriesContainer.innerHTML = '';

    try {
         // Fetch user profile
         const profileResponse = await fetch(`https://api.github.com/users/${username}`);
         const profile = await profileResponse.json();

         // Display user profile
         profileContainer.innerHTML = `
             <div>
                 <img src="${profile.avatar_url}" alt="Profile Picture">
                 <h2>${profile.name || username}</h2>
                 <p>${profile.bio || 'No bio available'}</p>
                 <a href="${profile.html_url}" target="_blank">Visit Profile on GitHub</a>
             </div>
         `;

        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await response.json();

        repositories.forEach(repo => {
            const repositoryItem = document.createElement('div');
            repositoryItem.className = 'repository';
            repositoryItem.innerHTML = `
            
            <div class="card my-4">
  <div class="card-body">
    <h5 class="card-title fw-bold text-primary"><a href="${repo.html_url}">${repo.name}</a></h5>
    <p class="card-text">${repo.description || 'No description available'}</p>
    <strong>Language:</strong>
    <a href="${repo.html_url}"><button class="btn btn-primary ">${repo.language || 'Not specified'}</button></a>
 
    </div>
</div>    
            `;
            repositoriesContainer.appendChild(repositoryItem);
        });
        
    }  catch (error) {
                console.error('Error fetching profile and repositories:', error.message);
                profileContainer.innerHTML = '<p>Error fetching profile and repositories. Please try again.</p>';
            }
}


