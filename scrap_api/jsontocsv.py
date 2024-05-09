import json
import csv
import sys

def json_to_tsv(json_file, tsv_file):
    with open(json_file, 'r') as file:
        data = json.load(file)

    with open(tsv_file, 'w', newline='') as file:
        writer = csv.writer(file, delimiter='\t')
        # Write the header row
        header = list(data[0].keys())
        attributes = data[0]['attributes']
        for attr_key in attributes.keys():
            header.append(attr_key)
        # Remove the attributes column
        del header[1]
        writer.writerow(header)

        for item in data:
            row = list(item.values())
            attributes = item['attributes']
            for attr_value in attributes.values():
                row.append(attr_value)
            # Remove the attributes column
            del row[1]
            writer.writerow(row)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python jsontocsv.py <input_json_file> <output_tsv_file>")
        sys.exit(1)

    json_file = sys.argv[1]
    tsv_file = sys.argv[2]
    json_to_tsv(json_file, tsv_file)
