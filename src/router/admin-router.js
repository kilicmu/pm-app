import DepartmentAdmin from "@/admin/views/department/index.vue"
import DoctorAdmin from "@/admin/views/doctor/index.vue"
import MealAdmin from "@/admin/views/meal/index.vue"
import ProjectAdmin from "@/admin/views/project/index.vue"
import ReportAdmin from "@/admin/views/report/index.vue"
import KnowledgeAdmin from "@/admin/views/knowledge/index.vue"

export const AdminRoutes = [{
    path: 'department',
    name: 'department',
    component: DepartmentAdmin
}, {
    path: 'doctor',
    name: 'doctor',
    component: DoctorAdmin
}, {
    path: 'meal',
    name: 'meal',
    component: MealAdmin
}, {
    path: 'project',
    name: 'project',
    component: ProjectAdmin
}, {
    path: 'report',
    name: 'report',
    component: ReportAdmin
}, {
    path: 'knowledge',
    name: 'knowledge',
    component: KnowledgeAdmin
},

]