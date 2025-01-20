/* File: script.js */
function divideGroups() {
    const namesInput = document.getElementById('nameList').value;
    const groupCount = parseInt(document.getElementById('groupCount').value);

    if (!namesInput || isNaN(groupCount) || groupCount < 1) {
        alert('Please enter valid names and number of groups.');
        return;
    }

    // Split names by commas or new lines and filter out empty values
    const names = namesInput.split(/,|\n/).map(name => name.trim()).filter(name => name);

    if (names.length < groupCount) {
        alert('Number of groups exceeds the number of names.');
        return;
    }

    // Shuffle the names array
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Divide names into groups randomly
    const groups = Array.from({ length: groupCount }, () => []);
    let shuffledNames = [...names];
    while (shuffledNames.length > 0) {
        for (let i = 0; i < groupCount; i++) {
            if (shuffledNames.length === 0) break;
            groups[i].push(shuffledNames.pop());
        }
    }

    // Display the results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    groups.forEach((group, i) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        groupDiv.innerHTML = `<h3>Group ${i + 1}</h3>`;

        const list = document.createElement('ul');
        group.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            list.appendChild(listItem);
        });
        groupDiv.appendChild(list);
        resultDiv.appendChild(groupDiv);
    });
}
