/// <reference path="../../vanilla.js"/>
/// <reference path="../lib/jasmine-2.4.0/jasmine-html.js"/>

describe("save List", function () {
    beforeEach(function () {
        localStorage.clear();
    });

    it("stores the array to the localstorage", function () {
        // Arrange
        var cache = ["bla"];

        // Act
        saveList(cache)

        // Assert
        var objectFromStorage = JSON.parse(localStorage.getItem("tasks"));
        expect(objectFromStorage.length).toBe(cache.length);
        expect(objectFromStorage[0]).toBe(cache[0]);
    });
    it("get items from cache when one was added, it is contained", function () {
        // Arrange
        spyOn(window, 'saveList');
        localStorage.setItem("tasks", JSON.stringify(["bla"]));

        // Act
        var cache = getItemsFromCache()

        // Assert
        expect(cache.length).toBe(1);
        expect(cache[0]).toBe("bla");
        expect(saveList).not.toHaveBeenCalled();
    });
    it("get items from cache when nothing defined yet", function () {
        // Arrange
        spyOn(window, 'saveList');

        // Act
        var cache = getItemsFromCache()

        // Assert
        expect(cache.length).toBe(0);
        expect(saveList).toHaveBeenCalled();
    });
    it("addElementToCache saves the given element", function () {
        // Arrange
        var existingCache = [];
        spyOn(window, "getItemsFromCache").and.returnValue(existingCache);
        spyOn(window, "saveList");

        // Act
        addElementToCache("hey");

        // Assert
        expect(saveList).toHaveBeenCalledWith(jasmine.objectContaining(["hey"]));
    });
    it("loadItemsFromCacheToUi will add alements to dom", function () {
        // Arrange
        var existingCache = ["bla", "bli"];
        spyOn(window, "getItemsFromCache").and.returnValue(existingCache);
        spyOn(window, "addElementToDom");

        // Act
        loadItemsFromCacheToUi();

        // Assert
        expect(addElementToDom).toHaveBeenCalledWith("bla", 0);
        expect(addElementToDom).toHaveBeenCalledWith("bli", 1);
    });
});