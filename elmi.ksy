meta:
  id: elmi
  file-extension: elmi
  title: Elm Language Interface
  endian: be
seq:
  - id: package_info
    type: package_info
  - id: import_count
    type: u8
  - id: imports
    type: import
    repeat: expr
    repeat-expr: import_count
  - id: export_count
    type: u8
  - id: exports
    type: export
    repeat: expr
    repeat-expr: export_count
  - id: definition_count
    type: u8
  - id: definitions
    type: definition
    repeat: expr
    repeat-expr: definition_count
types:
  package_info:
    seq:
      - id: version
        type: package_version
      - id: name
        type: package_id
  package_version:
    seq:
      - id: major
        type: u8
      - id: minor
        type: u8
      - id: patch
        type: u8
  package_id:
    seq:
      - id: author_username
        type: str_with_len
      - id: package_name
        type: str_with_len
  import:
    seq:
      - id: import_type
        type: u1
      - id: import_name
        type: str_with_len
      - id: import_path
        if: import_type == 2
        type: path
      - id: import_reserved
        if: import_type == 2
        type: u1
  export:
    seq:
      - id: export_path
        type: path
  definition:
    seq:
      - id: definition_name
        type: str_with_len
      - id: definition_tree
        type: definition_node
  definition_node:
    seq:
      - id: node_type
        type: u1
      - id: node_body
        type:
          switch-on: node_type
          cases:
            0: lambda_node
            1: variable_node
            2: type_node
            3: application_node
            4: record_node
            5: aliased_node
  lambda_node:
    seq:
      - id: lamda_left
        type: definition_node
      - id: lambda_right
        type: definition_node
  variable_node:
    seq:
      - id: variable_name
        type: str_with_len
  type_node:
    seq:
      - id: type_kind
        type: u1
      - id: type_body
        type:
          switch-on: type_kind
          cases:
            0: holley_type
            1: filled_type
  application_node:
    seq:
      - id: application_subject
        type: definition_node
      - id: application_objects_count
        type: u8
      - id: application_objects
        type: definition_node
        repeat: expr
        repeat-expr: application_objects_count
  record_node:
    seq:
      - id: record_fields_count
        type: u8
      - id: record_fields
        type: record_cell
        repeat: expr
        repeat-expr: record_fields_count
      - id: record_reserved
        contents: [ 0 ]
  aliased_node:
    seq:
      - id: aliased_type
        type: type_node
      - id: test_msg
        contents:
          - 0x0000000000000001
          - 0x0000000000000003
          - 'msg'
      - id: aliased_value
        type: message
      - id: aliased_value
        type: aliases
    types:
      message:
        seq:
          - id: message_variable
            type: variable_node
          - id: message_reserved
            contents: [ 0x01 ]
          - id: message_node
            type: definition_node
      aliases:
        seq:
          - id: aliases_reserved
            contents: [ 0x00 ]
          - id: aliases_count
            type: u8
          - id: aliases_list
            type: definition_node
            repeat: expr
            repeat-expr: aliases_count
  record_cell:
    seq:
      - id: record_cell_name
        type: str_with_len
      - id: record_cell_type
        type: definition_node
  holley_type:
    seq:
      - id: type_name
        type: str_with_len
  filled_type:
    seq:
      - id: username
        type: str_with_len
      - id: package
        type: str_with_len
      - id: subnames_count
        type: u8
      - id: name
        type: str_with_len
      - id: subnames
        type: str_with_len
        repeat: expr
        repeat-expr: subnames_count
  path:
    seq:
      - id: path_len
        type: u8
      - id: path_chunks
        type: str_with_len
        repeat: expr
        repeat-expr: path_len
  str_with_len:
    seq:
      - id: len
        type: u8
      - id: value
        type: str
        encoding: UTF-8
        size: len
