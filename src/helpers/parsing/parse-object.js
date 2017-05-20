export default function(input) {
    try {
        return JSON.parse(input.replace(/'/g, '"'));
    } catch(e) {
        return null;
    }
};
