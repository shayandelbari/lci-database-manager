import { db } from '$lib/server/db';
import type { CreateTablePayload, UpdateTablePayload } from '$lib/types/db';
import { isValidIdentifier } from '$lib/utils/db';
import { json } from '@sveltejs/kit';
import format from 'pg-format';

export async function GET({ url }) {
	const table = url.searchParams.get('table');
	if (!table) return json({ error: 'Table name is required' }, { status: 400 });
	if (!isValidIdentifier(table)) {
		return json({ error: 'Invalid table name' }, { status: 400 });
	}

	if (table === 'all') {
		const query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'";
		try {
			const tables = await db.query(query);
			return json(
				{ query, data: tables, message: 'Tables retrieved successfully' },
				{ status: 200 }
			);
		} catch (error) {
			console.error('Error executing query:', error);
			return json({ error: 'Error executing query', details: error }, { status: 500 });
		}
	}

	const query = format(
		'SELECT column_name, data_type FROM information_schema.columns WHERE table_name = %L;',
		table
	);

	try {
		const rows = await db.query(query);
		return json({ query, data: rows, message: 'Data retrieved successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error executing query:', error);
		return json({ error: 'Error executing query', details: error }, { status: 500 });
	}
}

export async function POST({ request, url }) {
	return json({ error: 'Action prevented to maintain the integrity of the data in the demo version.' }, { status: 500 });
	// const table = url.searchParams.get('table');
	// if (!table) return json({ error: 'Table name is required' }, { status: 400 });

	// if (!isValidIdentifier(table)) {
	// 	return json({ error: 'Invalid table name' }, { status: 400 });
	// }

	// const { columns }: CreateTablePayload = await request.json();
	// if (!Array.isArray(columns) || columns.length === 0) {
	// 	return json({ error: 'Invalid columns structure' }, { status: 400 });
	// }

	// for (const col of columns) {
	// 	if (!col.name || !isValidIdentifier(col.name)) {
	// 		return json({ error: 'Invalid column name' }, { status: 400 });
	// 	}
	// 	if (!col.type || typeof col.type !== 'string') {
	// 		return json({ error: 'Invalid column type' }, { status: 400 });
	// 	}
	// }

	// const columnDefs = columns.map((col) => format('%I %s', col.name, col.type)).join(', ');

	// const query = format('CREATE TABLE %I (%s)', table, columnDefs);

	// try {
	// 	await db.query(query);

	// 	return json({ query, message: 'Table created successfully' }, { status: 201 });
	// } catch (error) {
	// 	console.error('Query: ', query);
	// 	console.error('Error executing query:', error);
	// 	return json({ error: 'Error executing query: ' + error }, { status: 500 });
	// }
}

export async function PUT({ request, url }) {
	return json({ error: 'Action prevented to maintain the integrity of the data in the demo version.' }, { status: 500 });
	// const table = url.searchParams.get('table');
	// if (!table) return json({ error: 'Table name is required' }, { status: 400 });
	// if (!isValidIdentifier(table)) {
	// 	return json({ error: 'Invalid table name' }, { status: 400 });
	// }

	// const { changes }: UpdateTablePayload = await request.json();
	// if (!Array.isArray(changes) || changes.length === 0) {
	// 	return json({ error: 'Invalid changes structure' }, { status: 400 });
	// }

	// for (const change of changes) {
	// 	if (!change.action || !['ADD', 'DROP', 'MODIFY'].includes(change.action)) {
	// 		return json({ error: 'Invalid action in changes' }, { status: 400 });
	// 	}
	// 	if (!change.column || !isValidIdentifier(change.column)) {
	// 		return json({ error: 'Invalid column name in changes' }, { status: 400 });
	// 	}
	// 	if (change.action !== 'DROP' && (!change.type || typeof change.type !== 'string')) {
	// 		return json({ error: 'Invalid column type in changes' }, { status: 400 });
	// 	}
	// }

	// const queries = changes.map((change) => {
	// 	switch (change.action) {
	// 		case 'ADD':
	// 			return format('ALTER TABLE %I ADD COLUMN %I %s', table, change.column, change.type);
	// 		case 'DROP':
	// 			return format('ALTER TABLE %I DROP COLUMN %I', table, change.column);
	// 		case 'MODIFY':
	// 			return format('ALTER TABLE %I ALTER COLUMN %I TYPE %s', table, change.column, change.type);
	// 	}
	// });

	// try {
	// 	await Promise.all(
	// 		queries.map(async (query) => {
	// 			await db.query(query);
	// 		})
	// 	);

	// 	return json(
	// 		{ query: queries.join(';'), message: 'Table updated successfully' },
	// 		{ status: 200 }
	// 	);
	// } catch (error) {
	// 	console.error('Error executing queries:', error);
	// 	return json({ error: 'Error executing queries: ' + error }, { status: 500 });
	// }
}

export async function DELETE({ url }) {
	return json({ error: 'Action prevented to maintain the integrity of the data in the demo version.' }, { status: 500 });
	// const table = url.searchParams.get('table');
	// if (!table) return json({ error: 'Table name is required' }, { status: 400 });

	// if (!isValidIdentifier(table)) {
	// 	return json({ error: 'Invalid table name' }, { status: 400 });
	// }

	// const query = format('DROP TABLE %I', table);

	// try {
	// 	await db.query(query);

	// 	return json({ query, message: 'Table deleted successfully' }, { status: 200 });
	// } catch (error) {
	// 	console.error('Query: ', query);
	// 	console.error('Error executing query:', error);
	// 	return json({ error: 'Error executing query: ' + error }, { status: 500 });
	// }
}
