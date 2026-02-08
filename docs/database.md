# Database Design

## Entities

### Employee
- id
- full_name
- email
- status (active / leaving)
- area_id

### Area
- id
- name
- description

### Knowledge
- id
- name
- description
- critical_level (low / medium / high)

### EmployeeKnowledge
- employee_id
- knowledge_id
- proficiency_level (basic / intermediate / advanced)

## Relationships
- An employee belongs to one area
- An area has many employees
- Employees can have multiple knowledge items
- Knowledge can be assigned to multiple employees