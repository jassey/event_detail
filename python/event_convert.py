# 
# 行数据拆分
# 
# 输入：
# ID,日期,名称,创建者,参与者列表
# 1,2015-09-01,"设计师面试",HR,"小李,小王,小严"
# 
# 输出：
# ID,日期,名称,创建者,参与者
# 1,2015-09-01,设计师面试,HR,小李
# 1,2015-09-01,设计师面试,HR,小王
# 1,2015-09-01,设计师面试,HR,小严

import csv

source = 'event.csv'
dest = 'event_detail.csv'

def get_detail():
    content = []
    with open(source, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            member_list = row['参与者列表'].split(',')
            del row['参与者列表']
            for member in member_list:
                item = row.copy()
                item["参与者"] = member
                content.append(item)
    return content

with open(dest, 'w', encoding='utf-8') as f:
    writer = csv.DictWriter(f, ['ID', '日期', '名称', '创建者', '参与者'])
    writer.writeheader()
    writer.writerows(get_detail())

