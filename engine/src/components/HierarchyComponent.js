class HierarchyComponent {
    constructor() {
        this.parent = null;
        this.children = [];
    }

    setParent(parent) {
        this.parent = parent;
    }

    addChild(child) {
        const childHierarchy = child.getComponent('HierarchyComponent');
        if(childHierarchy) {
            childHierarchy.setParent(this.parent);
            this.children.push(child);
        } else {
            throw new Error('Child entity must have a HierarchyComponent.');
        }
    }

    removeChild(child) {
        const index = this.children.indexOf(child);
        if(index !== -1) {
            this.children.splice(index, 1);
            const childHierarchy = child.getComponent('HierarchyComponent');
            if(childHierarchy) {
                childHierarchy.setParent(null);
            }
        }
    }
}
