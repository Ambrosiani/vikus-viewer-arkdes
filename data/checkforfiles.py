import csv

file_name_records_list = 'records.csv'
file_name_files_list = 'files.csv' 

ok = []
files_missing = []
records_missing = []

with open(file_name_files_list, newline='') as f:
    files_list = list(csv.reader(f))


with open(file_name_records_list, newline='') as f:
	records_list = list(csv.reader(f))

print ('number of files:', len(files_list))
print ('number of records:',len(records_list))



for row in records_list:
	if row in files_list:
		ok.append(row[0])
	else:
		files_missing.append(row[0])

for row in files_list:
	if row not in records_list:
		records_missing.append(row[0])

print ('record & file ok:',len(ok), '\n')
print ('file missing:', len(files_missing),*files_missing, '\n', sep='\n')
print ('record missing:', len(records_missing),*records_missing, '\n', sep='\n')