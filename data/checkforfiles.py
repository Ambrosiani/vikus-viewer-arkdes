import csv

with open('files-TIFfromNAS-05.csv', newline='') as f:
    reader = csv.reader(f)
    files_list = list(reader)

with open('records.csv', newline='') as csvfile:
	records_csv = csv.reader(csvfile, delimiter=';', quotechar='"')
	for row in records_csv:
		if row in files_list:
			print('found',row)
