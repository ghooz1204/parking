import { useCallback, useEffect } from 'react';

const useScrollEnd = (callback, root) => {
    const handleScroll = useCallback(() => {
        const endPoint = root
            ? Math.abs((root.clientHeight + root.scrollTop) - root.scrollHeight) < 2
            : Math.abs((window.innerHeight + document.documentElement.scrollTop) - document.documentElement.scrollHeight) < 2;
        if (endPoint) {
            callback();
        }
    }, [callback, root]);
    useEffect(() => {
        if (root) {
            root.addEventListener('scroll', handleScroll);
            return () => root.removeEventListener('scroll', handleScroll);
        } else {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll, root]);
};

export default useScrollEnd;
