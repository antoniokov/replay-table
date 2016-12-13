export default function(input) {
    try {
        return JSON.parse(input);
    } catch(e) {
        return null;
    }
}