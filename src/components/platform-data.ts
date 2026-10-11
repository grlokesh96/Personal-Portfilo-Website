export type PlatformNode = {
  id: string;
  label: string;
  color: string;
  desc: string;
};

export const PLATFORM_NODES: PlatformNode[] = [
  {
    id: "eks",
    label: "EKS",
    color: "#FF9900",
    desc: "Managed production clusters across Dev, QA, UAT and Prod with Karpenter autoscaling.",
  },
  {
    id: "argo",
    label: "Argo CD",
    color: "#EF7B4D",
    desc: "GitOps sync and progressive delivery with Argo Rollouts and signed image promotion.",
  },
  {
    id: "terraform",
    label: "Terraform",
    color: "#7B42BC",
    desc: "Composable module library provisioning AWS landing zones across 12 accounts.",
  },
  {
    id: "istio",
    label: "Istio",
    color: "#466BB0",
    desc: "Service mesh providing mTLS, traffic routing and distributed tracing.",
  },
  {
    id: "vault",
    label: "Vault",
    color: "#FFD54A",
    desc: "Secrets management with IRSA-backed, short-lived workload credentials.",
  },
  {
    id: "prometheus",
    label: "Prometheus",
    color: "#E6522C",
    desc: "SLO-driven burn-rate alerting on error budgets across 45+ services.",
  },
  {
    id: "trivy",
    label: "Trivy",
    color: "#22c55e",
    desc: "Shift-left container, IaC and filesystem scanning on every pull request.",
  },
  {
    id: "grafana",
    label: "Grafana",
    color: "#F46800",
    desc: "Metrics, logs and traces unified behind one pane with SLO dashboards.",
  },
];
