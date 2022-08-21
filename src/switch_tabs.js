const tabSwitcher = (target, allTargets) => {
    allTargets.forEach(element => {
        element.classList.remove('active')
    });
    target.classList.add('active');
}


export {tabSwitcher};