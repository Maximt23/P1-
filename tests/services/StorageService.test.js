// ... (existing tests)

  it('adds and retrieves a clothing item', async () => {
    const newItem = { name: 'Test Shirt', categoryGroup: 'torso' };
    db.db.runAsync.mockResolvedValueOnce(true); // Mock insert
    db.db.getAllAsync.mockResolvedValueOnce([{...newItem, id: 'ci_123'}]); // Mock select

    await storageService.addClothingItem(newItem);
    const items = await storageService.getClothingItems();

    expect(db.db.runAsync).toHaveBeenCalled();
    expect(db.db.getAllAsync).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM ClothingItem'));
    expect(items[0].name).toBe('Test Shirt');
  });
});
