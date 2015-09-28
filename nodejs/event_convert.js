
//
// 行数据拆分
//
// 使用了：BabyParse csv解析库（https://github.com/Rich-Harris/BabyParse）
//
// 输入：
// ID,日期,名称,创建者,参与者列表
// 1,2015-09-01,"设计师面试",HR,"小李,小王,小严"
//
// 输出：
// ID,日期,名称,创建者,参与者
// 1,2015-09-01,设计师面试,HR,小李
// 1,2015-09-01,设计师面试,HR,小王
// 1,2015-09-01,设计师面试,HR,小严
//

var file_source = 'event.csv';
var file_dest = 'event_detail.csv';

var fs = require('fs');
var csv = require('BabyParse');

var content = fs.readFileSync(file_source, 'utf-8');

var data = csv.parse(content, {header: true}).data;

var detail = [];
data.forEach(function(row) {
    var member_list = row['参与者列表'].split(',');
    member_list.forEach(function(member) {
        detail.push({
            'ID': row['ID'],
            '日期': row['日期'],
            '名称': row['名称'],
            '创建者': row['创建者'],
            '参与者': member
        });
    });
});

fs.writeFileSync(file_dest, csv.unparse(detail), 'utf-8');