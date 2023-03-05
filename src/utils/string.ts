export const truncate = (str: string, limit = 0) => {
    return str.substring(0, limit - 3).concat('...');
};
