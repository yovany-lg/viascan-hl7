const jsonMapping = {
  "format": "hl7-2.4",
  "adapter": "default",
  "mapping": {
    "msh": {
      "values": [
        { "field": "msh.datetime", "component": [5,1] },
        { "field": "msh.code", "component": [7,1] },
        { "field": "msh.trigger_event", "component": [7,2] },
        { "field": "msh.structure", "component": [7,3] },
        { "field": "msh.control_id", "component": [8,1] },
        { "field": "msh.processing_id", "component": [9,1] },
        { "field": "msh.character_set", "component": [16,1] },
        { "field": "msh.profile_entity_id", "component": [19,1] },
        { "field": "msh.profile_namespace", "component": [19,2] },
      ]
    },
    spm: {
      values: [
        { field: 'spm.set_id', component: [1,1] },
        { field: 'spm.specimen_id', component: [2,1] },
        { field: 'spm.type', component: [4,1] },
        { field: 'spm.role', component: [11,1] },
      ]
    },
    obr: {
      values: [
        { field: 'obr.order_number', component: [1,1] },
        { field: 'obr.service_identifier_id', component: [4,1] },
        { field: 'obr.service_identifier_text', component: [4,2] },
        { field: 'obr.service_identifier_coding_system', component: [4,3] },
      ]
    },
    orc: {
      values: [
        { field: 'orc.order_control', component: [1,1] },
        { field: 'orc.order_status', component: [5,1] },
        { field: 'orc.date_time', component: [9,1] },
      ]
    },
    obx: {
      values: [
        { field: 'obx.set_id', component: [1,1] },
        { field: 'obx.value_type', component: [2,1] },
        { field: 'obx.observation_identifier_id', component: [3,1] },
        { field: 'obx.observation_identifier_text', component: [3,2] },
        { field: 'obx.observation_identifier_coding_system', component: [3,3] },
        { field: 'obx.value', component: [5,1] },
        { field: 'obx.unit_identifier', component: [6,1] },
        { field: 'obx.unit_text', component: [6,2] },
        { field: 'obx.unit_coding_system', component: [6,3] },
        { field: 'obx.references_range', component: [7,1] },
        { field: 'obx.abnormal_flags', component: [8,1] },
        { field: 'obx.result_status', component: [11,1] },
        { field: 'obx.responsible_observer', component: [16,1] },
        { field: 'obx.equipment_id', component: [18,1] },
        { field: 'obx.equipment_namespace', component: [18,2] },
        { field: 'obx.date_time', component: [19,1] },
      ]
    }
  }
}

module.exports = jsonMapping;

// "pid": {
//   "values": [
//     { "field": "pid.id", "component": [3,1] },
//     { "field": "pid.origin", "component": [3,4] },
//     { "field": "pid.first_name", "component": [5,2] },
//     { "field": "pid.last_name", "component": [5,1] },
//     { "field": "pid.birthdate", "component": [7,1] },
//     { "field": "pid.gender", "component": [8,1] },
//     { "field": "pid.street_name", "component": [11,1] },
//     { "field": "pid.city", "component": [11,3] },
//     { "field": "pid.zip_code", "component": [11,5] },
//     { "field": "pid.phone", "component": [13,1] },
//     { "field": "pid.email", "component": [13,4] }
//   ]
// },
// "sch": {
//   "values": [
//     { "field": "sch.id", "component": [2,1] },
//     { "field": "sch.origin", "component": [2,2] },
//     { "field": "sch.length", "component": [6,1] },
//     { "field": "sch.minutes", "component": [11,3] },
//     { "field": "sch.datetime", "component": [11,4] },
//     { "field": "sch.datetime", "component": [16,1] },
//     { "field": "sch.last_name", "component": [16,2] },
//     { "field": "sch.first_name", "component": [16,3] },
//     { "field": "sch.source", "component": [20,1] },
//     { "field": "sch.status", "component": [25,1] }
//   ]
// },
// "rgs": {
//   "values": [
//     { "field": "rgs.id", "component": [1,1] }
//   ]
// },
// "aig": {
//   "values": [
//     { "field": "aig.id", "component": [1,1] },
//     { "field": "aig.rpps_finess", "component": [4,1] }
//   ]
// },
// "nte": {
//   "values": [
//     { "field": "nte.comment", "component": [3,1] }
//   ]
// }
