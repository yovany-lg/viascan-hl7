exports.SPM = {
  '1': 'set_id',
  '2': 'specimen_id',
  '4': 'type',
  '11': 'role',
};

exports.OBR = {
  '2': 'order_number',
  '4.1': 'service_identifier_id',
  '4.2': 'service_identifier_text',
  '4.3': 'service_identifier_coding_system',
};

exports.ORC = {
  1: 'order_control',
  5: 'order_status',
  9: 'date_time'
};

exports.OBX = {
    2: 'value_type',
    '3.1': 'identifier',
    '3.2': 'identifier_text',
    '3.3': 'identifier_coding_system',
    5: 'value',
    '6.1': 'unit_identifier',
    '6.2': 'unit_text',
    '6.3': 'unit_coding_system',
    7: 'references_range',
    8: 'abnormal_flags',
    11: 'result_status',
    16: 'responsible_observer',
    '18.1': 'equipment_id',
    '18.2': 'equipment_namespace',
    19: 'date_time',
}
