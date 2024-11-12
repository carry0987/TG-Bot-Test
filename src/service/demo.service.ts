import { Injectable } from '@nestjs/common';
import { Item } from '@/common/interface/interfaces';
import { CreateItemDto } from '@/common/dto/create-item.dto';
import { generateUUID } from '@carry0987/utils';

@Injectable()
export class DemoService {
    private readonly items: Item[] = [];

    // Retrieve all items
    public findAll(): Item[] {
        // Return all items
        return this.items;
    }

    // Retrieve an item by id
    public findOne(id: string): Item | undefined {
        // Find item by id
        return this.items.find((item) => item.id === id);
    }

    // Create a new item
    public create(itemData: CreateItemDto): Item {
        // Add new item
        const newItem: Item = {
            id: generateUUID(), // Generate a unique ID
            ...itemData,
        };
        this.items.push(newItem);

        return newItem;
    }

    // Update an existing item
    public update(id: string, itemData: Partial<Item>): Item | undefined {
        // Find item index
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) {
            return undefined;
        }
        // Update item based on id
        this.items[index] = { ...this.items[index], ...itemData };

        return this.items[index];
    }

    // Remove an item by id
    public remove(id: string): boolean {
        // Filter out the item with the given id
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);

        return true;
    }
}
