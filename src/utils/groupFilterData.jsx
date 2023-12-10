const groupAndFilterData = (data, searchTitle) => {
    const statusChanger = (status) => {
        switch (status) {
            case 'completed':
                return 'Completed'
            case 'dropped':
                return 'Dropped'
            case 'on_hold':
                return 'On Hold'
            case 'plan_to_watch':
                return 'Plan to Watch'
            case 'watching':
                return 'Watching'
        }
    }

    return data
        .filter(item => item.title.toLowerCase().includes(searchTitle.toLowerCase()))
        .reduce((result, currentItem) => {
            const status = currentItem.status;
            const existingGroup = result.find(group => group.title === statusChanger(status));

            if (existingGroup) {
                existingGroup.data.push(currentItem);
            } else {
                const newGroup = { title: statusChanger(status), data: [currentItem] };
                result.push(newGroup);
            }
            return result;
        }, []);
};

export default groupAndFilterData