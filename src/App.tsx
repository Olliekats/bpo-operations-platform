import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Layout } from './components/Layout';
import * as Modules from './modules';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentModule, setCurrentModule] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const moduleComponents: Record<string, React.ComponentType> = {
    dashboard: Modules.EnhancedDashboard,
    'realtime-ops': Modules.RealTimeOps,
    'contact-center-ai': Modules.EnhancedContactCenter,
    'interaction-log': Modules.InteractionLog,
    'complaints': Modules.EnhancedComplaintsManagement,
    'approvals-queue': Modules.ApprovalsQueue,
    'workforce-mgmt': Modules.WorkforceManagement,
    'attendance': Modules.AttendanceTracking,
    'time-off': Modules.TimeOffRequests,
    'quality-assurance': Modules.QualityAssurance,
    'performance-mgmt': Modules.PerformanceManagement,
    'coaching-plans': Modules.CoachingPlans,
    'csat-surveys': Modules.CSATSurveys,
    'knowledge-base': Modules.KnowledgeBase,
    'client-mgmt': Modules.ClientManagement,
    'alert-monitoring': Modules.AlertMonitoring,
    'access-control': Modules.AccessControl,
    'bpmn': Modules.VisualBPMN,
    'process-mapping': Modules.EnhancedProcessMapping,
    'workflow-automation': Modules.WorkflowAutomation,
    'smart-automation': Modules.SmartAutomation,
    'nl-query': Modules.NLQueryModule,
    'predictive-analytics': Modules.PredictiveAnalyticsModule,
    'sop': Modules.SOPBuilder,
    'kpi': Modules.KPIManager,
    'analytics': Modules.Analytics,
    'dashboards': Modules.ExecutiveDashboards,
    'reporting': Modules.Reporting,
    'projects': Modules.ProjectManager,
    'gantt-charts': Modules.ProjectGantt,
    'change-initiatives': Modules.ChangeInitiatives,
    'stakeholders': Modules.StakeholderManagement,
    'communications': Modules.CommunicationPlans,
    'training': Modules.TrainingPrograms,
    'resistance': Modules.ResistanceManagement,
    'readiness': Modules.ReadinessAssessment,
    'impact': Modules.ImpactAnalysis,
    'hr-transition': Modules.TransitionProjects,
    'digital-transition': Modules.TransitionProjects,
    'culture-transition': Modules.TransitionProjects,
    'billing-transition': Modules.TransitionProjects,
    'it-transition': Modules.TransitionProjects,
    'bi-transition': Modules.TransitionProjects,
    'training-transition': Modules.TransitionProjects,
    'policies': Modules.PolicyManagement,
    'compliance': Modules.ComplianceTracking,
    'audit': Modules.AuditTrails,
    'raci': Modules.RACIMatrix,
    'risks': Modules.RiskAnalysis,
    'finance': Modules.Finance,
    'teams': Modules.TeamManagement,
    'capacity': Modules.CapacityPlanning,
    'budget': Modules.BudgetTracking,
    'time-tracking': Modules.TimeTracking,
    'improvements': Modules.ContinuousImprovement,
    'ai-processor': Modules.AIDocumentProcessor,
    'tech-specs': Modules.TechnicalSpecs,
    'ai-config': Modules.AIConfiguration,
  };

  const CurrentModuleComponent = moduleComponents[currentModule] || Modules.EnhancedDashboard;

  return (
    <Layout currentModule={currentModule} onModuleChange={setCurrentModule}>
      <CurrentModuleComponent />
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
