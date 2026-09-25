# OneK Website Collaboration Guide

This repository is the source of truth for the OneK Nature Reserve website.

## Contributor setup

1. Accept the GitHub repository invitation from `oneknaturereserve`.
2. Connect your own GitHub account to Codex. Never share passwords, verification codes, or access tokens.
3. Clone the repository:

   ```bash
   git clone https://github.com/oneknaturereserve/onek-website.git
   cd onek-website
   pnpm install
   pnpm dev
   ```

4. Create a branch for every change:

   ```bash
   git switch -c collaborator/short-change-name
   ```

5. Commit and push the branch, then open a pull request into `main`.
6. Review the automatic Vercel preview before merging.

## Working rules

- Do not push website changes directly to `main`.
- Keep images and other source assets in this repository so both collaborators receive the same version.
- Use pull requests for review and conflict resolution.
- A Vercel preview is for review; merging or publishing to the official domain requires approval from the repository owner.
- GitHub manages source code, Vercel manages deployments, and a shared ChatGPT Project may be used for planning and discussion.

## 中文协作说明

1. 接受 `oneknaturereserve` 发出的 GitHub 仓库邀请。
2. 在自己的 Codex 中连接自己的 GitHub 账号，不共享密码、验证码或访问令牌。
3. 克隆本仓库并安装依赖。
4. 每次修改建立独立分支，不直接向 `main` 提交网页修改。
5. 推送分支后创建 Pull Request，并检查 Vercel 自动生成的预览网页。
6. 经仓库所有者确认后再合并或发布到正式域名。
