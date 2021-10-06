//package repositories.JDBC;
//
//import models.Employee;
//import models.Reimbursement;
//import repositories.ReimbursementRepo;
//import utils.ConnectionUtil;
//
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.List;
//
//public class ReimbursementJDBC implements ReimbursementRepo {
//
//    ConnectionUtil cu = ConnectionUtil.getConnectionUtil();
//
//    @Override
//    public Reimbursement add(Reimbursement reimbursement) {
//        try (Connection conn = cu.getConnection()) {
//
//            String sql = "insert into reimbursements values (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) returning *";
//
//            PreparedStatement ps = conn.prepareStatement(sql);
//            ps.setInt(1, reimbursement.getEmployeeId());
//            ps.setString(2, reimbursement.getEvent_type());
//            ps.setString(3, reimbursement.getEvent_location());
//            ps.setString(4, reimbursement.getEvent_description());
//            ps.setString(5, reimbursement.getStart_date());
//            ps.setString(6, reimbursement.getEnd_date());
//            ps.setString(7, reimbursement.getGrade_type());
//            ps.setString(8, reimbursement.getGrade());
//            ps.setDouble(9, reimbursement.getAmount());
//            ps.setBoolean(10, reimbursement.isSup_approval());
//            ps.setBoolean(11, reimbursement.isHead_approval());
//            ps.setBoolean(12, reimbursement.isBenco_approval());
//
//
//            ResultSet rs = ps.executeQuery();
//
//            if (rs.next()) {
//                // TODO - needs refactoring to fix author firstName lastName from being 'null'
//                reimbursement.setId(rs.getInt("id"));
//
//                return reimbursement;
//            }
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//
//        return null;
//    }
//
//    @Override
//    public Reimbursement getById(Integer id) {
//        try (Connection conn = cu.getConnection()) {
//
////            String sql = "select b.id, b.event_type, b.location, b.description, b.start_date, b.end_date, b.grade_type, b.grade, b.reimbursement_amount, b.sup_approval, b.head_approval, b.benco_approval, a.id as employee_id, a.first_name, a.last_name, a.supervisor_name, a.head_name, a.dep_id \n" +
////                    "from reimbursements b left join employees a on b.employee_id = a.id where b.id = ?";
//            String sql = "select * from reimbursements where id = ?";
//
//            PreparedStatement ps = conn.prepareStatement(sql);
//            ps.setInt(1, id);
//
//            ResultSet rs = ps.executeQuery();
//
//            if (rs.next()) {
//                Employee a = new Employee();
////                a.setEmployee_id(rs.getInt("employee_id"));
////                a.setFirst_name(rs.getString("first_name"));
////                a.setLast_name(rs.getString("last_name"));
////                a.setSup_name(rs.getString("supervisor_name"));
////                a.setHead_name(rs.getString("head_name"));
////                a.setDept_id(rs.getInt("dep_id"));
//
//                Reimbursement b = new Reimbursement();
//                b.setId(rs.getInt("id"));
//                b.setEvent_type(rs.getString("event_type"));
//                b.setEvent_location(rs.getString("location"));
//                b.setEvent_description(rs.getString("description"));
//                b.setStart_date(rs.getString("start_date"));
//                b.setEnd_date(rs.getString("end_date"));
//                b.setGrade_type(rs.getString("grade_type"));
//                b.setGrade(rs.getString("grade"));
//                b.setAmount(rs.getDouble("reimbursement_amount"));
//                b.setSup_approval(rs.getBoolean("sup_approval"));
//                b.setHead_approval(rs.getBoolean("head_approval"));
//                b.setBenco_approval(rs.getBoolean("benco_approval"));
////                b.setEmployee(a);
//
//                return b;
//            }
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
//
//    @Override
//    public List<Reimbursement> getAll() {
//        List<Reimbursement> reimbursements = new ArrayList<>();
//
//        try (Connection conn = cu.getConnection()) {
//
//            // we will need to use a join on books and authors to get all data needed
////            String sql = "select b.id, b.event_type, b.location, b.description, b.start_date, b.end_date, b.grade_type, b.grade, b.reimbursement_amount, b.sup_approval, b.head_approval, b.benco_approval, a.id as employee_id, a.first_name, a.last_name, a.supervisor_name, a.head_name, a.dep_id \n" +
////                    "from reimbursements b left join employees a on b.employee_id = a.id";
//            String sql = "select * from reimbursements";
//            PreparedStatement ps = conn.prepareStatement(sql);
//
//            ResultSet rs = ps.executeQuery();
//
//            while (rs.next()) {
////                Employee a = new Employee();
////                a.setEmployee_id(rs.getInt("employee_id"));
////                a.setFirst_name(rs.getString("first_name"));
////                a.setLast_name(rs.getString("last_name"));
////                a.setSup_name(rs.getString("supervisor_name"));
////                a.setHead_name(rs.getString("head_name"));
////                a.setDept_id(rs.getInt("dep_id"));
//
//                Reimbursement b = new Reimbursement();
//                b.setId(rs.getInt("id"));
//                b.setEvent_type(rs.getString("event_type"));
//                b.setEvent_location(rs.getString("location"));
//                b.setEvent_description(rs.getString("description"));
//                b.setStart_date(rs.getString("start_date"));
//                b.setEnd_date(rs.getString("end_date"));
//                b.setGrade_type(rs.getString("grade_type"));
//                b.setGrade(rs.getString("grade"));
//                b.setAmount(rs.getDouble("reimbursement_amount"));
//                b.setSup_approval(rs.getBoolean("sup_approval"));
//                b.setHead_approval(rs.getBoolean("head_approval"));
//                b.setBenco_approval(rs.getBoolean("benco_approval"));
////                b.setEmployee(a);
//
//                reimbursements.add(b);
//            }
//
//            return reimbursements;
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//
//        return null;
//    }
//
//    @Override
//    public void update(Reimbursement reimbursement) {
//
//    }
//
//    @Override
//    public void delete(Integer id) {
//
//    }
//}
