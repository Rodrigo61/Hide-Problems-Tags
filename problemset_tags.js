const tagLinks = document.querySelectorAll('a[href*="tags"]');

// check if the page has a tag links (as in problemset page)
if (tagLinks.length > 0)
{
    // get the container component of the set of tags of each problem
    let problemTagsContainers = new Set();
    tagLinks.forEach(tag => {
        problemTagsContainers.add(tag.parentElement);
    });

    // Store original tag of each tag in a new attribute
    tagLinks.forEach(tag => {
        const originalTag = tag.text;
        tag.setAttribute("originalTag", originalTag);
    });

    // create individual hide/show button for each problem
    problemsToggleButtons = []
    problemTagsContainers.forEach(container => {
        const hideShowButton = document.createElement("button");
        hideShowButton.setAttribute("style", "font-size: 1.1rem");
        hideShowButton.textContent = "+";
        hideShowButton.onclick = () => toggleProblemTags(hideShowButton);
        container.appendChild(hideShowButton);
        
        problemsToggleButtons.push(hideShowButton);
    });

    // create 'global' hide/show button
    const hideShowButton = document.createElement("button");
    hideShowButton.textContent = hideText;
    hideShowButton.onclick = () => toggleAllTags(hideShowButton, problemsToggleButtons);
    const menuElement = document.querySelectorAll('.second-level-menu-list')[1];
    menuElement.appendChild(hideShowButton);

    // starts with tags hidden
    hideShowButton.click();

}


function toggleProblemTags(toggleButton, hide = null) {
    if (hide == null)
        hide = toggleButton.textContent === '-';

    if (hide)
        toggleButton.textContent = '+';
    else
        toggleButton.textContent = '-';
    
    const container = toggleButton.parentElement;
    const containerTags = container.querySelectorAll('a[href*="tags"]');

    containerTags.forEach(tag => {
        if (hide)
        {
            tag.text = "hidden tag";
        }
        else
        {
            const originalTag = tag.getAttribute("originalTag");
            tag.text = originalTag;
        }
    })
}


function toggleAllTags(btn, problemsToggleButtons)
{
    if (btn.textContent === showText)
    {
        btn.textContent = hideText;
        problemsToggleButtons.forEach(btn => {
            toggleProblemTags(btn, false);
        })
    }
    else
    {
        btn.textContent = showText;
        problemsToggleButtons.forEach(btn => {
            toggleProblemTags(btn, true);
        })
    }
}

