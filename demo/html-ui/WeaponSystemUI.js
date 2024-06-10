import UIComponent from "./UIComponent.js";

export default class WeaponSystemUI extends UIComponent {
    constructor(label) {
        super();
        this.label = label;

        this.labelElement = document.createElement('div');
        this.labelElement.textContent = `${label}`;
        this.labelElement.className = 'component-label';
        this.element.appendChild(this.labelElement);

        this.gridElement = document.createElement('div');
        this.gridElement.className = 'weapon-system-grid';
        this.element.appendChild(this.gridElement);

        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = 'weapon-system-buttons';
        this.element.appendChild(this.buttonContainer);

        this.element.className = 'ui-component max-width-small font-small';
        this.weaponGroups = {};
        this.mountsLength = 0;
    }

    onAdd(ui) {
        super.onAdd(ui);
        this.ui.eventBus.on('weaponGroups.update', (weaponGroups) => {
            this.weaponGroups = weaponGroups;
            this.updateGrid();
        });

        this.ui.eventBus.on('activeGroup.update', (activeGroup) => {
            this.activeGroup = activeGroup;
            this.updateGrid();
        });
    }

    updateGroups(weaponGroups, activeGroup, mountLength) {
        this.mountsLength = mountLength;
        this.weaponGroups = weaponGroups;
        this.activeGroup = activeGroup;
        this.updateGrid();
    }

    createButton(groupKey) {
        const button = document.createElement('button');
        button.textContent = `${groupKey}`;

        console.log('Buttons:', this.activeGroup, groupKey);

        button.className = this.activeGroup+'' === groupKey ? 'is-active' : '';
        button.onclick = () => {
            this.ui.eventBus.emit('key', groupKey);
        };
        return button;
    }

    updateGrid() {
        this.gridElement.innerHTML = '';
        this.buttonContainer.innerHTML = '';

        const mountRow = document.createElement('div');
        mountRow.className = 'weapon-system-row';

        for(let i = 0; i < this.mountsLength; i++) {
            const mountCell = document.createElement('div');
            mountCell.className = 'mount-cell';
            if(this.weaponGroups[this.activeGroup]?.includes(i)) {
                const activeIndicator = document.createElement('div');
                activeIndicator.className = 'active-indicator';
                mountCell.appendChild(activeIndicator);
            }
            mountRow.appendChild(mountCell);
        }

        this.gridElement.appendChild(mountRow);

        ['1', '2', '3', '4'].forEach(groupKey => {
            this.buttonContainer.appendChild(this.createButton(groupKey));
        });
    }
}
