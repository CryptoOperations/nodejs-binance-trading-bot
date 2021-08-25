export const helpers: any = {};

/**
 * Parse a JSON string to an Object in all cases without throwing
 * @param str - JSON string
 * @returns - Parsed JSON Object
 */
helpers.parseJsonToObject = (str: string) => {

    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }

};